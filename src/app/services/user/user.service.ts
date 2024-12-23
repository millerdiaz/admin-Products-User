import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}

  apiUrl : string = "http://localhost:3000/api"


  getUser(){
    return this.http.get(`${this.apiUrl}/users`)
  }

  deleteUser(id:string){
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`)
  }

  addUser(body:any){
    return this.http.post(`${this.apiUrl}/addUsers`,body)
  }


  updateUser(id: string, body: any) {
    return this.http.put(`${this.apiUrl}/updateUser/${id}`, body);
  }

  getOne(id:string){
    return this.http.get(`${this.apiUrl}/user/${id}`)
  }

  session(body:any){
    return this.http.post(`${this.apiUrl}/inicioDeSesion`,body)
  }


}
