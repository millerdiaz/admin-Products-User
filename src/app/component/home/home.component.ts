import { Component, importProvidersFrom, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [

    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productsService =   inject(ProductsService)
  products! : any;
  formEdit!: FormGroup
  usuario: any ="";
  roll : string = "";
  productService = inject(ProductsService)
  busqueda = new FormControl
  busquedaMarca = new FormControl
  


  constructor(private fb: FormBuilder,private route:Router){
    this.formEdit = this.fb.group({
      marca: ['',[Validators.required]],
      modelo: ['',[Validators.required]],
      img: ['',[Validators.required]],
      precio: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      disponibilidad: ['',[Validators.required]],
    })

  }


  ngOnInit(){
    const usuarioGuardado = sessionStorage.getItem('usuario');
    this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : "";
    this.roll = this.usuario.roll

    if(this.usuario){
    this.productsService.getProducts().subscribe({
      next:(resApi:any)=>{
        console.log(resApi);
        this.products = resApi
      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }else{
    this.route.navigate(["/login"])

  }
  }

  deleteproducts(id:string){
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar el producto?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A4C3B9",
      cancelButtonColor: "#1D3557",
      confirmButtonText: "¡Si, eliminar producto!"
    }).then((result) => {

      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe({
        next:(resApi:any)=>{
        Swal.fire({
          title: "¡Eliminado!",
          text: "El producto ha sido eliminado",
          icon: "success"

        }).then(() => {
          location.reload(); // Recarga la página
        });

      },

      error:(error:any)=>{
        console.log(error);
        Swal.fire({
          title: "Deleted!",
          text:`${error.error.error}`,
          icon: "success"
        });

      }

    });
  }
    })
  }

  updateProduct(id:string){
    this.productsService.getOne(id).subscribe({
      next:(resApi:any)=>{
        console.log(resApi);

        this.formEdit.setValue({
          marca: resApi.marca,
            modelo: resApi.modelo,
            img: resApi.img,
            precio:resApi.precio,
            genero: resApi.genero,
            descripcion:resApi.descripcion,
            disponibilidad: resApi.disponibilidad
          })

        },
        error:(error:any)=>{
          console.log(error);

        }
      })
    }

  editProduct(id:string){
    if (this.formEdit.valid) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
            }).then((result) => {
          if (result.isConfirmed) {
            this.productsService.updateProduct(id,this.formEdit.value).subscribe({
              next:(resApi:any)=>{
                Swal.fire("Guardado!", "Los cambios han sido guardados", "success");
                this.ngOnInit()
              },
              error:(error:any)=>{
                console.log(error);

              }
            })
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
            });

          }
          else{
            Swal.fire({
              title:"Formulario invalido",
              icon:"warning"
            })
          }
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

  findGroup(){
    this.productService.findGroup(this.busquedaMarca.value).subscribe({
      next:(resApi:any)=> {
          this.products = resApi
      },
      error:(error:any)=> {
          console.log(error);
        }
      })
  }
}


