import { Component, OnInit } from '@angular/core';
import { EntradasService } from "../../services/entradas.service";
import { ItemsService } from "../../services/items.service";

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  public alerta:any = {}
  public selectedItems:any = [{}];
  public itemFound:any = {}
  public id:String = '';
  public desc:any = '';
  public cantidad:any = '';
  public costo:any = '';
  public currentStock:any = '';
  public total:number = 0;
  public subTotal:number = 0;
  public descuento:number = 0;


  constructor(
    private entradaService: EntradasService,
    private itemService: ItemsService
  ) { }

  ngOnInit():void {
    if (this.selectedItems.length == 1) {
      this.selectedItems.splice(0,1);
    } 
  }

  addItem(){
    let data ={
      producto:this.desc,
      precio:this.costo,
      cantidad:this.cantidad,
      total: this.total
    }
    this.selectedItems.push(data);
    this.calcularTotal();
  }

  deleteItem(i:any):void{
    this.selectedItems.splice(i,1);
    this.calcularTotal();
}

  calcularTotal(){
    this.subTotal = 0;
    this.selectedItems.forEach((i:any) => {
      this.subTotal = this.subTotal + (i.precio * i.cantidad);
    });
    this.total = this.subTotal - this.descuento;
  }

  checkItemExist(){
    let newStock = 0;
    let currentStock:number = 0;
    this.itemService.oneItemId(this.id).subscribe({
      next: (data:any)=>{
        this.itemFound = data.data;
        currentStock = +this.itemFound.stock
        newStock = (currentStock + this.cantidad);
        console.log(newStock);
    let updatedStock ={
      stock:newStock
    }
    if (this.itemFound) {
      this.itemService.itemPut(updatedStock,this.id).subscribe({
        next: (data:any)=>{
          this.alerta = {
            show:true,
            msg: 'Actualizado con exito',
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
    }
      },
      error:(err:any)=>{
        console.log('entro al error')
        let newData = {
          _id:this.id,
          desc:this.desc,
          price:this.costo,
          stock:this.cantidad,
          imgs: []
        }
        console.log(newData)
        this.itemService.itemPost(newData).subscribe({
          next:(next:any)=>{
            this.alerta = {
              show:true,
              msg: 'Producto nuevo',
              color:'green',
              icon:'success'
            }
            console.log('aqui ta')
          },error:(err:any)=>{
            this.alerta = {
              show:true,
              msg: 'Error',
              color:'red',
              icon:'error'
            }
          }
        })
      }
    });
    
    
  }

}
