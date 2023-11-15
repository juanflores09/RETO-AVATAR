import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  urlImage: string = '../../assets/logo-pokeapi.png' // Imagen de usuario
  constructor() { }
  
  ngOnInit(): void {
  }

}
