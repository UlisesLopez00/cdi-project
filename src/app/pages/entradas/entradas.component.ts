import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  public alerta:any = {}
  public selectedItems:any = {}
  public items:any = {}
  constructor() { }

  ngOnInit() {
  }

}
