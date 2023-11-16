import { Component,  Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // Importamos las librerías necesarias para este componente

@Component({
  selector: 'app-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.scss']
})
export class DialogWarningComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any // data
  ) { }

  ngOnInit(): void {
  }

}
