import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})

export class AddProductsComponent {

  productService =inject(ProductsService) // aqui estamos inyectando a ProductoService que viene de producto.service.ts es decir estamos importando su clase.
  products!: any;
  formProduct!:FormGroup
  usuario: any ="";
  roll : string = "";

  constructor(private fb: FormBuilder,private route:Router){
    this.formProduct = this.fb.group({
      marca: ['',[Validators.required, Validators.minLength(3)]],
      modelo: ['',[Validators.required,Validators.minLength(4)]],
      img: ['',[Validators.required,Validators.minLength(8)]],
      precio: ['',[Validators.required,Validators.minLength(6)]],
      genero: ['',[Validators.required,Validators.minLength(6)]],
      descripcion: ['',[Validators.required,]],
      disponibilidad: ['',[Validators.required,Validators.minLength(3)]],
    })


  }


  ngOnInit(): void {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : "";
    this.roll = this.usuario.roll

    if (!this.usuario) {
      this.route.navigate(["/login"])
    }
  }

    addProduct(){
      if (this.formProduct.valid) {
         this.productService.addProduct(this.formProduct.value).subscribe({
           next:(resApi:any)=>{

             Swal.fire({
               icon:"success",
               title:"creado",
               text:"Nuevo producto añadido"
             })
             this.formProduct.reset()
           },
             error:(error:any)=>{
               Swal.fire({
               icon:"success",
               title:"creado",
               text:"Nuevo producto añadido"
               })
             }

         })
      }else{
         Swal.fire({
           icon:"error",
           title:"Form invalido",
           text:"Diligencie correctamente los campos"
         })
      }
     }
}

