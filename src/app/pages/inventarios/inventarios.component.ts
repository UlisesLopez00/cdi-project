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
          color: 'red'
        }
      }
    })
  }

}
