import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}
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
      iconPath:'../../../assets/icons/products.svg',
      navegation:'productos'
    },
    {
      name:'Productos',
      iconPath:'../../../assets/icons/products.svg',
      navegation:'productos'
    },
  ];
  ngOnInit(): void {}
}
