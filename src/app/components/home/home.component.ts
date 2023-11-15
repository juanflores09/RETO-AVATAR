import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonList: IPokemon[] = [];
  nomSearch:string='';
  offset = 0;
  sizePaginationList:number[] = [10,15,20]

  constructor(
    private apiService:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getList(this.offset, 10);
  }

  
  //------------ METODO PARA LISTAR ------------//
  getList(offset:number, limit?: any){
    
    this.apiService.getList(offset,limit.value).pipe(
      switchMap((res) => {
        const requests: Observable<IPokemon>[] = res.results.map((pokemon: any) => 
          this.apiService.getByName(pokemon.name));
        return forkJoin(requests); // Utilizamos forkJoin para manejar las solicitudes en paralelo

      })).subscribe((details: IPokemon[]) => {
      this.pokemonList = details.map((detail: IPokemon) => ({
        name: detail.name,
        sprites:detail.sprites?.other['official-artwork'].front_default,
        types:detail.types
      }));
    });
  }

  viewDetails(name:string){
    this.router.navigate([`/detail`,{name:name}])
  }
}
