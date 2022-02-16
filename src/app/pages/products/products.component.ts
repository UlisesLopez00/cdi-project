import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  public alerta:any = {}
  public cdb: any = '';
  public descripcion: string = '';
  public precio?: number;
  public cantidad?: number;
  ngOnInit(): void {}
  public focus(id: any) {
    document.getElementById(id)?.focus();
    console.log('hola');
  }



  public registrar(){
    let data ={
      cdb:this.cdb,
      descripcion:this.descripcion,
      precio:this.precio,
      cantidad:this.cantidad
    }
    if (!this.cdb || !this.descripcion || !this.precio || !this.cantidad) {
      console.log("Error");
      
      this.alerta={
        show:true,
        msg:'Todos los campos son obligatorios',
        color:'#FFCC00'
      }
    }
  }
}
