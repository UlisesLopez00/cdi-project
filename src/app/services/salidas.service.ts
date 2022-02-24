import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

constructor(private http: HttpClient) { }

public url: any = 'http://localhost:3000';

public outGet(){
  return this.http.get(`${this.url}/out`);
}

public outPost(data: any){
  return this.http.post(`${this.url}/out`,data);
}

public outPut(data:any){
  return this.http.put(`${this.url}/out`,data);
}

public outDelete(id: any){
  return this.http.delete(`${this.url}/out/${id}`)
}

}

