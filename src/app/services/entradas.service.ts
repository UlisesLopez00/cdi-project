import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

constructor(private http: HttpClient) { }
public url = 'http://localhost:3000';

public entradaGet(){
  return this.http.get(`${this.url}/entrada`);
}

public entradaPost(data:any){
  return this.http.post(`${this.url}/entrada`,data);
}

public entradaPut(data:any,id:any){
  return this.http.put(`${this.url}/entrada/${id}`,data);
}

public entradaDelete(id:any){
  return this.http.delete(`${this.url}/entrada/${id}`);
}

}
