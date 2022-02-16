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
}
