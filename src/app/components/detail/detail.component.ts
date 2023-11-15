import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  name:string = '';
  image:string='';
  pokemon!:IPokemon;
  stats:any;
  types:any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private apiService:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.name = this.activatedRoute.snapshot.paramMap.get('name') || ''
    this.getPokemon();
  }

  getPokemon(){
    this.apiService.getByName(this.name).subscribe((data:IPokemon)=>{
      console.log("data--> ",data)
      this.image = data.sprites?.other['official-artwork'].front_default
      this.stats = data.stats; 
      this.types = data.types;
      this.pokemon = {
        name:(data.name).toUpperCase(),
        weight: parseFloat(((data.weight??1)*0.1).toFixed(1)),
        height: parseFloat(((data.height??1)*0.1).toFixed(1)),
      
      };
    })
  }

  redirectToback(){
    this.router.navigate(['/home'])
  }

}
