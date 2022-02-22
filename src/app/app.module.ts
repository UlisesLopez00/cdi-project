import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { AlerttimeComponent } from './components/alerts/alerttime/alerttime.component';
import { AlertconfirmationComponent } from './components/alerts/alertconfirmation/alertconfirmation.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DndDirective } from './directives/dnd.directive'
import { NgxFileDropModule } from 'ngx-file-drop';

import { NgChartsModule } from 'ng2-charts';
import { UsersComponent } from './pages/users/users.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AlerttimeComponent,
    AlertconfirmationComponent,
    HomeComponent,
    ProductsComponent,
    UsersComponent,
    DndDirective,
    InventariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
