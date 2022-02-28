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
  
  constructor(
    private outService: SalidasService,
    private itemService: ItemsService
    ) { }

  ngOnInit() {
    this.showItems();
    this.showOuts();
    console.log(this.selectedItems);
    if (this.selectedItems.length == 1) {
      this.selectedItems.splice(0,1);
    } 
  }

  showItems(){
    this.itemService.itemGet().subscribe({
      next: (data:any)=>{
        this.items = data.data;
        console.log(this.items);
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

  updateOut(id:any,data:any){
    
  }

  addItem(producto:any){
    this.cdb = producto._id;
    this.costo = producto.price;
    this.description = producto.desc 
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
      precio: this.costo
    }
    this.selectedItems.push(data);
    console.log(this.selectedItems);
    }
  }

  deleteItem(i:any):void{
      this.selectedItems.splice(i,1);
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
    
    this.searchById($event)
    
  }

}
