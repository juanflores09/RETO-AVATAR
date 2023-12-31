import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-loading',
  templateUrl: './dialog-loading.component.html',
  styleUrls: ['./dialog-loading.component.scss']
})
export class DialogLoadingComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any // data
  ) { }

  ngOnInit(): void {
  }

}
