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
    return this.http.put(`${this.url}/items/${id}`,data);
  }
  public itemDelete(id:any){
    return this.http.delete(`${this.url}/items/${id}`);
  }

}
