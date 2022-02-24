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

  constructor(
    private outService: SalidasService,
    private itemService: ItemsService
    ) { }

  ngOnInit() {
    this.showItems();
    this.showOuts();
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

}
