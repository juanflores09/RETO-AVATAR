import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonList: IPokemon[] = [];
  nomSearch:string='';
  offset:number = 0;
  limit:number = 10;
  sizePaginationList:number[] = [10,15,20]
  pageNum:number=1;

  urlImageDefault: string = '../../assets/img-default.png' // Imagen de usuario

  constructor(
    private apiService:ApiService,
    private router:Router,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.getList(this.offset, this.limit);
  }

  //------------ METODO PARA LISTAR ------------//
  getList(offset:number, limit?: any){
    
    this.alertService.loadingDialogShow("Cargando...")
    this.apiService.getList(offset, limit).pipe(
      switchMap((res) => {
        const requests: Observable<IPokemon>[] = res.results.map((pokemon: any) => 
          this.apiService.getByName(pokemon.name));
        return forkJoin(requests); // Utilizamos forkJoin para manejar las solicitudes en paralelo

      })).subscribe((details: IPokemon[]) => {
      this.pokemonList = details.map((detail: IPokemon) => ({
        name: detail.name,
        sprites:detail.sprites?.other['official-artwork'].front_default || this.urlImageDefault,
        types:detail.types
      }));
      if(this.offset!=0) this.pageNum = this.offset/this.limit;
      console.log("PAGE NUM",this.pageNum)
      this.alertService.loadingDialogClose();
    });
  }

   //------------ Metodo para buscar por nombre -------//
   getPokemon(){
    
    // Validamos el nombre a buscar 
    if(this.nomSearch =='' || this.nomSearch ==null ){
      this.alertService.warningDialog("Ingrese un nombre de Pokemon a buscar")
      return;
    }

    this.alertService.loadingDialogShow("Cargando...");
    this.apiService.getByName(this.nomSearch.toLocaleLowerCase()).subscribe((data:IPokemon)=>{
      this.pokemonList = [];
      this.pokemonList.push({
        name: data.name,
        sprites:data.sprites?.other['official-artwork'].front_default,
        types:data.types
      })
      this.alertService.loadingDialogClose();
    }, () =>{
      this.alertService.warningDialog("El nombre ingresado no existe")
      this.alertService.loadingDialogClose();
      return;
    })
  }

  viewDetails(name:string){
    this.router.navigate([`/detail`,{name:name}])
  }

  //----------- PAGINACION ------------//
  getPage(action:number){ //Página siguiente cuando es 1, atras cuando es 0 
    if( action==1){
      this.offset = this.offset  + this.limit; 
    }else{
      this.offset = this.offset - this.limit; 
    }
    this.getList(this.offset,this.limit);
  }

  getSize(event:any){
    this.limit = parseInt(event.value);
    this.offset = 0;
    this.getList(this.offset,this.limit);
  }

  firstPage(){
    this.offset = 0;
    this.pageNum = 1;
    this.getList(this.offset,this.limit);
  }
}
