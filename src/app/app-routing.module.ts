import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component'
import { SalidasComponent } from './pages/salidas/salidas.component'
import { EntradasComponent } from "./pages/entradas/entradas.component";

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'users', component:UsersComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'stock', component:InventariosComponent},
  {path: 'out', component: SalidasComponent},
  {path: 'entradas', component: EntradasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
