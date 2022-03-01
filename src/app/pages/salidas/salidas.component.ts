import { Component, OnInit } from '@angular/core';
import { SalidasService } from "../../services/salidas.service";
import { ItemsService } from "../../services/items.service";

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  public items: any = [];
  public outs: any = [];
  public alerta: any ={};
  public product:any = '';
  public cantidad:any = '';
  public fecha:any = '';
  public selectedItems:any = [{}];
  public cdb:any = '';
  public description:any = '';
  public costo:any = '';
  public itemSearch:any = '';
  public amount:any = '';
  public total:number = 0;
  public subTotal:number = 0;
  public descuento:number = 0;
  public stock:any = '';
  public idToUpdateStock:any = '';
  
  constructor(
    private outService: SalidasService,
    private itemService: ItemsService
    ) { }

  ngOnInit() {
    this.showItems();
    this.showOuts();
    
    if (this.selectedItems.length == 1) {
      this.selectedItems.splice(0,1);
    } 
  }

  showItems(){
    this.itemService.itemGet().subscribe({
      next: (data:any)=>{
        this.items = data.data;
        
      },error:(err:any)=>{
        this.alerta = {
          show: true,
          msg: 'Error',
          color: 'red',
          icon: 'error'
        }
      }
    })
  }

  showOuts(){
    this.outService.outGet().subscribe({
      next:(data:any)=>{
        this.outs = data.data;
      },error:(err:any)=>{
        this.alerta ={
          show:true,
          msg:'Error',
          color:'red',
          icon:'error'
        }
      }
    })
  }

  registerOut(){
    let data = {
      item: this.product,
      cantidad:this.cantidad,
      fecha: this.fecha
    }
    return this.outService.outPost(data).subscribe({
      next:(data:any)=>{
        this.alerta ={
          show:true,
          msg:'Registrado con exito',
          color:'green',
          icon:'success'
        }
        this.showOuts();
      },error:(err:any)=>{
        this.alerta ={
          show:true,
          msg:'Error',
          color:'red',
          icon:'error'
        }
      }
    })
  }

  deleteOut(id:any){
    this.outService.outDelete(id).subscribe({
      next:(data:any)=>{
        this.alerta ={
          show:true,
          msg:'Borrado con exito',
          color:'green',
          icon:'success'
        }
        this.showOuts();
      },error:(err:any)=>{
        this.alerta ={
          show:true,
          msg:'Error',
          color:'red',
          icon:'error'
        }
      }
    })
  }

  addItem(producto:any){
    this.cdb = producto._id;
    this.costo = producto.price;
    this.description = producto.desc,
    this.stock = producto.stock
  }

  saveItem(){
    
    if (!this.amount) {
      this.alerta ={
        show:true,
        msg:'Cantidad no puede estar vacio',
        color:'orange',
        icon:'warning'
      }
    }else{
    let data = {
      descripcion:this.description,
      cantidad: this.amount,
      precio: this.costo,
      stock: this.stock,
      id:this.cdb
    }
    this.selectedItems.push(data);
    this.calcularTotal();
   
    }
  }

  deleteItem(i:any):void{
      this.selectedItems.splice(i,1);
      this.calcularTotal();
  }



  searchById(data:any){
    this.itemService.itemGetId(data).subscribe({
      next:(data:any)=>{        
        this.items = data.data;
      },error:(err:any)=>{
        this.alerta = {
          show:true,
          msg:'No se encontró el producto',
          color:'red',
          icon: 'error'
        }
      }
    })
  }

  public buscador($event:any){
    this.searchById($event);
  }

  calcularTotal(){
    this.subTotal = 0;
    this.selectedItems.forEach((i:any) => {
      this.subTotal = this.subTotal + (i.precio * i.cantidad);
    });
    this.total = this.subTotal - this.descuento;
  }

  updateStock(){
    let dataOut = {
      item: this.description,
      cantidad: this.amount,
      total: this.total,
    }
    for (let i = 0; i < this.selectedItems.length; i++) {
      let currentStock = this.selectedItems[i].stock;
      let newStock = currentStock - this.selectedItems[i].cantidad;
      let data={
        stock:newStock
      }
      if (this.amount>currentStock) {
        this.alerta = {
          show:true,
          msg: 'No puede ser mayor a stock',
          color:'orange',
          icon:'warning'
        }
        this.selectedItems = []
        if (currentStock<=0) {
          this.alerta = {
            show:true,
            msg: 'No queda stock',
            color:'orange',
            icon:'warning'
          }
          this.selectedItems = []
        }
        else{
          this.itemService.itemPut(data,this.selectedItems[i].id).subscribe({
            next:(data:any)=>{
              this.alerta = {
                show:true,
                msg: 'Registrado con exito',
                color:'green',
                icon:'success'
              }
              this.selectedItems = []
              this.showItems();
              console.log(dataOut)
              this.outService.outPost(dataOut).subscribe({
                next: (data:any)=>{
                  this.alerta = {
                    show:true,
                    msg: 'Correcto',
                    color:'green',
                    icon:'success'
                  }
                },error:(err:any)=>{
                  this.alerta = {
                    show:true,
                    msg: 'Error',
                    color:'red',
                    icon:'error'
                  }
                }
              })
            },error:(err:any )=>{
              this.alerta = {
                show:true,
                msg: 'Registrado con exito',
                color:'error',
                icon:'red'
              }
            } 
          });
      }
      }
    }
  }

}
