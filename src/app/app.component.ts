import { Component } from '@angular/core';
import {EnviromentService} from './services/enviroment.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public envService:EnviromentService) {}

  title = 'cdi';
  
}
