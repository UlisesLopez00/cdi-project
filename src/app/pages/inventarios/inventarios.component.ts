import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service'

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  constructor(private itemService:ItemsService) { }
  public alerta: any = {};
  public items: any = '';
  public itemEdit: any = {};
  public showModalEdit:any = false;
  public itemSearch:any = '';
  public itemFound:any = '';
  public encontrarItem:any = false;

  ngOnInit() {
    this.showItems();
  }

  showItems(){
    this.itemService.itemGet().subscribe({
      next: (data:any)=>{
        this.items = data.data;
      },
      error: (err: any)=>{
        this.alerta ={
          show:true,
          msg:'Error al buscar',
          color: 'red',
          icon:'error'
        }
      }
    })
  }

  editar(item: any){
    this.itemEdit = item;
    console.log(this.itemEdit);
    this.showModalEdit = true;
  }

  cancel(){
    this.showModalEdit = false;
  }

  save(id: any){
    let data = {
      desc: this.itemEdit.desc,
      stock: this.itemEdit.stock,
      price: this.itemEdit.price,
    }
    if(confirm('¿Seguro de los cambios?')){
    this.itemService.itemPut(data,id).subscribe({
      next: (data:any)=>{
        this.alerta ={
          show:true,
          msg:'Actualizado con exito',
          color: 'green',
          icon:'success'
        }
        this.showItems();
        this.showModalEdit = false;
      },error:(err:any)=>{
        this.alerta ={
          show:true,
          msg:'Error al actualizar',
          color: 'red',
          icon:'error'
        }
      }
    })
  }
  }

  deleteItem(id:any){
    if (confirm('¿Seguro de eliminar?')) {
      this.itemService.itemDelete(id).subscribe({
        next: (data:any)=>{
          this.alerta ={
            show:true,
            msg: '¡Eliminado con exito!',
            color: 'green',
            icon:'success'
          }
          this.showItems();
        },error:(err:any)=>{
          this.alerta ={
            show:true,
            msg: 'Error al eliminar',
            color: 'red',
            icon:'error'
          }
        }
      })
    }
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
