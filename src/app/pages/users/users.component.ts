import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
public name: string = '';
public email: string='';
public pwd: string='';
public alerta:any = {};
public users:any = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.showUsers();
  }

  showUsers(){
    this.userService.userGet().subscribe({
      next: (data:any)=>{
        console.log(data);
      },
      error:(err:any)=>{
        this.alerta = {
          show:true,
          msg:'Error al conectar con el servidor. Intentelo mas tarde',
          icon:'error',
          color:'red'
        }
        console.log(err)
      }
    })
  }

  registerUser(){
    let data = { 
      user: this.name,
      email: this.email,
      pwd: this.pwd
    };
    this.userService.userPost(data).subscribe({
      next: (data:any)=>{
        this.alerta = {
          show:true,
          msg:'Usuario Registrado con éxito',
          color:'green'
        }
      },
      error: (err: any)=>{
        this.alerta = {
          show:true,
          msg:'Error',
          color:'red'
        }
        console.log(err)
      } 
    })
  }

}
