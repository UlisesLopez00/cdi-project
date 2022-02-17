import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  public url = 'http://localhost:3000';
  public login(data:any){
    return this.http.post(`${this.url}/login`,data);
  }
  public userPost(data:any){
    return this.http.post(`${this.url}/users`,data);
  }
  public userGet(){
    return this.http.get(`${this.url}/users`);
  }
  public userPut(data: any,id:any){
    return this.http.get(`${this.url}/users/${id}`,data);
  }
  public userDelete(data:any,id:any){
    return this.http.get(`${this.url}/users/${id}`,data);
  }
}
