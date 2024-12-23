import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {



    userService = inject(UserService)
    users!:any;
    formUser!: FormGroup
    formEditUser!:any
    usuario: any ="";
    roll: string ="";

  constructor(private fb: FormBuilder, private route:Router){
    this.formUser = this.fb.group({
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      correo: ['',[Validators.required,Validators.email]],
      contrasena: ['',[Validators.required]],
      roll: ['',[Validators.required]],
    })

    this.formEditUser= this.fb.group({
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      correo: ['',[Validators.required,Validators.email]],
      contrasena: ['',[Validators.required]],
      roll: ['',[Validators.required]],
    })
  }

  ngOnInit(){
    const usuarioGuardado = sessionStorage.getItem('usuario')
    this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado):"";
    this.roll = this.usuario.roll

    if (this.usuario) {
    this.userService.getUser().subscribe({
      next:(resApi:any)=>{
        console.log(resApi);
        this.users=resApi

      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }else{
    this.route.navigate(["/login"])

  }
  }

  deleteUsers(id:string){
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar el usuario?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A4C3B9",
      cancelButtonColor: "#1D3557",
      confirmButtonText: "¡Si, eliminar usuario!"
    }).then((result) => {

          if (result.isConfirmed) {
            this.userService.deleteUser(id).subscribe({
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

  addUser(){
    if (this.formUser.valid) {
      this.userService.addUser(this.formUser.value).subscribe({
        next:(resApi:any)=>{
          this.formUser.reset()
           Swal.fire({
           icon:"success",
           title:"creado",
           text:"Usuario añadido"
         }).then(() => {
          window.location.reload(); // Recarga la página después del mensaje
        });
       },
         error:(error:any)=>{
           Swal.fire({
           icon:"success",
           title:"creado",
           text:"Nuevo Usuario añadido"
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

  updateUser(id:string){
    this.userService.getOne(id).subscribe({
      next:(resApi:any)=>{
        console.log(resApi);
        this.formEditUser.setValue({
          nombre: resApi.nombre,
          apellidos: resApi.apellidos,
          correo: resApi.correo,
          contrasena: resApi.contrasena,
          roll: resApi.roll
        })

      },
      error:(error:any)=>{
        console.log(error);

      }
    })
  }

   editUser(id:string){
      if (this.formEditUser.valid) {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
              }).then((result) => {
            if (result.isConfirmed) {
              this.userService.updateUser(id,this.formEditUser.value).subscribe({
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


  }


