import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { ApiService } from 'src/app/services/api.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemonList: IPokemon[] = [];

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  
  // METODO PARA LISTAR POKEMONES
  private getList(){

    this.apiService.getList().pipe(
      switchMap((res) => {
        console.log("RES -->",res)
        const requests: Observable<IPokemon>[] = res.results.map((pokemon: any) => 
          this.apiService.getByName(pokemon.name));
        return forkJoin(requests); // Utilizamos forkJoin para manejar las solicitudes en paralelo

      })).subscribe((details: IPokemon[]) => {
      this.pokemonList = details.map((detail: IPokemon) => ({
        name: detail.name,
        sprites:detail.sprites?.other['official-artwork'].front_default
      }));

      console.log(this.pokemonList)
    });
  }
}
