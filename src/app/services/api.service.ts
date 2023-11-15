import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPokemon } from '../interfaces/pokemon';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url =  environment.API_HOST;

  constructor(
    private httpClient:HttpClient
  ) { }

  // METODO PARA TRAER LISTA DE POKEMONES
  getList():Observable<IApiResponse<IPokemon>>{
    return this.httpClient.get<IApiResponse<IPokemon>>(`${this.url}/pokemon`)
  }

  // METODO PARA BUSCAR POKEMON POR ID
  getByName(name:number){
    return this.httpClient.get<IPokemon>(`${this.url}/pokemon/${name}`)
  }
}
