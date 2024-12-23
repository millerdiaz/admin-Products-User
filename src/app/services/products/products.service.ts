import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  token:any = sessionStorage.getItem('token')
  apiUrl = "http://localhost:3000/api"

  getProducts() {
    return this.http.get(`${this.apiUrl}/showProduct`)
  }

  find(modelo:string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)

    return this.http.get(`${this.apiUrl}/showProduct/${modelo}`, {headers})

}

  findGroup(marca:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    return this.http.get(`${this.apiUrl}/busquedaMarca/${marca}`, {headers})

  }

  deleteProduct(id:string){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

  addProduct (body:any){
    return this.http.post(`${this.apiUrl}/addProduct`,body)
  }

  updateProduct(id: string, body: any) {
    return this.http.put(`${this.apiUrl}/upDate/${id}`, body);
  }

  getOne(id:string){
    return this.http.get(`${this.apiUrl}/showOne/${id}`)
  }

}
