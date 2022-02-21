import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public name: string = '';
  public email: string = '';
  public pwd: string = '';
  public confirmPwd: string = '';
  public alerta: any = {};
  public users: any = [];
  public editar: boolean = false;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.showUsers();
  }

  showUsers() {
    this.userService.userGet().subscribe({
      next: (data: any) => {
        this.users = data.data;
      },
      error: (err: any) => {
        this.alerta = {
          show: true,
          msg: 'Error al conectar con el servidor. Intentelo mas tarde',
          icon: 'error',
          color: 'red',
        };
        console.log(err);
      },
    });
  }

  registerUser() {
    let data = {
      user: this.name,
      email: this.email,
      pwd: this.pwd,
    };

    if (this.confirmPwd === this.pwd) {
      this.userService.userPost(data).subscribe({
        next: (data: any) => {
          this.alerta = {
            show: true,
            msg: 'Usuario Registrado con éxito',
            color: 'green',
          };
          this.showUsers();
        },
        error: (err: any) => {
          this.alerta = {
            show: true,
            msg: 'Error',
            color: 'red',
          };
          console.log(err);
        },
      });
    } else {
      this.alerta = {
        show: true,
        msg: 'Las contraseñas no coinciden',
        color: 'red',
        icon: 'warning',
      };
      console.log('contraseña !=');
    }
  }

  deleteUser(id: any) {
    if (confirm('Seguro de eliminar?'))
      this.userService.userDelete(id).subscribe({
        next: (data: any) => {
          this.alerta = {
            show: true,
            msg: 'Usuario eliminado con éxito',
            color: 'green',
          };
          this.showUsers();
        },
        error: (err: any) => {
          this.alerta = {
            show: true,
            msg: 'Error al eliminar',
            color: 'green',
          };
          console.log(err);
        },
      });
  }

  clicActualizar(user: any) {
    this.editar = true;
    this.name = user.user;
    this.email = user.email;
    console.log(user.pwd);
    
  }
  actualizarUser() {

    let data = {
      user:this.name,
      email:this.email,
      pwd:this.pwd
    };
  }
}
