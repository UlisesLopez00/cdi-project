import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviromentService } from 'src/app/services/enviroment.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor( private router: Router,
    private envService: EnviromentService, ) {}

    ngOnInit():void {
      if (!localStorage.getItem('token')) {
        this.router.navigate(['login']);
      }
    }
    
  public showMenuMovil:boolean = false;
  public routes = [
    {
      name:'Dashboard',
      iconPath:'../../../assets/icons/dashboard.svg',
      navegation:'home'
    },
    {
      name:'Productos',
      iconPath:'../../../assets/icons/products.svg',
      navegation:'products'
    },
    {
      name:'Usuarios',
      iconPath:'../../../assets/icons/users-icon.svg',
      navegation:'users'
    },
    {
      name:'Inventario',
      iconPath:'../../../assets/icons/inventario.svg',
      navegation:'stock'
    },
  ];

  closeSesion(){
    this.router.navigate(['login']);
    this.envService.navbar = false;
    localStorage.removeItem('token');
  }
}
