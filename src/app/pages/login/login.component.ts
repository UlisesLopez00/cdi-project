import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviromentService } from 'src/app/services/enviroment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:String='';
  public password:String='';
  constructor(private router:Router,private envService:EnviromentService) { 
    this.envService.navbar = false;
  }

  ngOnInit(): void {
 
  }
login(){
  let data = {
    user:this.user,
    password:this.password
  }
  console.log(data);
  this.router.navigate(['home'])
  this.envService.navbar = true;

}
}
