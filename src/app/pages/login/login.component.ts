import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: String = '';
  public password: String = '';
  public alerta:any = {};
  constructor(
    private router: Router,
    private envService: EnviromentService,
    private userService: UsersService
  ) {

    this.envService.navbar = false;
  }

  ngOnInit(): void {}
  login() {
    let data = {
      email: this.user,
      pwd: this.password,
    };

    this.userService.login(data).subscribe({
      next: (data:any)=>{
        this.alerta = {
          show:true,
          msg:'Bienvenido',
          color:'green',
          icon:'success'
        }
        localStorage.setItem('token',data.token);
        this.envService.navbar = true;
        window.location.href = 'http://localhost:4200/home'
        
      },
      error: (err: any)=>{
        this.alerta = {
          show:true,
          msg:'Usuario y/o contraseña incorrecta',
          color:'red',
          icon:'error'
        }
        console.log(err)
      } 
    });

  }
}
