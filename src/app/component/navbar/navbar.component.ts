import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  usuario: any ="";
  roll : string = "";
  products!: any;
  productService = inject(ProductsService)


  busqueda = new FormControl
  constructor(private route:Router){}


  ngOnInit(): void {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : "";
    this.roll = this.usuario.roll
    console.log(this.roll);
  }

  logOut(){
    sessionStorage.clear()
    this.route.navigate(["/login"])
    this.ngOnInit()
  }

  ngDoCheck(): void {
    this.ngOnInit()

  }


  findProduct(){
    console.log(this.busqueda.value);
    this.productService.find(this.busqueda.value).subscribe({
      next:(resApi:any)=> {
          this.products = resApi
      },
      error:(error:any)=> {
          console.log(error);
        }
      })
      }



}
