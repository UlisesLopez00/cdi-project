import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

constructor(private http: HttpClient) { }
public url = 'http://localhost:3000';
  public itemPost(data:any){
    return this.http.post(`${this.url}/items`,data);
  }
  public itemGet(){
    return this.http.get(`${this.url}/items`);
  }
  public itemPut(data: any,id:any){
    return this.http.get(`${this.url}/items/${id}`,data);
  }
  public itemDelete(data:any,id:any){
    return this.http.get(`${this.url}/items/${id}`,data);
  }

}
