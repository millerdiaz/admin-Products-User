import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userService = inject(UserService)
  users!:any;
  formLogin!:FormGroup

  constructor(private fb: FormBuilder, private router:Router){
    this.formLogin = this.fb.group({
      correo:['',[Validators.required, Validators.email]],
      contrasena:['',[Validators.required,Validators.minLength(5)]]
    })
  }
  ngOnInit() {
      this.userService.getUser().subscribe({
        next: (resApi: any) => {
          this.users = resApi;
        },
        error: (error: any) => {
          console.log('Error al verificar usuario:', error);
          this.router.navigate(['/login']);
          Swal.fire({
            icon: "error",
            title: "Sesión inválida",
            text: "Por favor, inicie sesión nuevamente."
          });
        }
      });

  }



  login(){
    if (this.formLogin.valid) {
      console.log(this.formLogin.value)
      this.userService.session(this.formLogin.value).subscribe({
        next:(resApi:any)=>{
          let data = resApi
          // sessionStorage.setItem('token', token)
          sessionStorage.setItem('usuario',JSON.stringify(data));
          this.router.navigate(['/home'])
          Swal.fire({
            icon:"success",
            title:"Bienvenido!",
            text:"Se ha iniciado sesión"
        })
    },
    error:(error:any)=>{
        console.log(error);
        Swal.fire({
        icon:"error",
        title:"Ups!",
        text:`${error.error.msg}`
        })
        this.router.navigate(['/login'])
      }

  })
  } else {
    Swal.fire({
    icon:"warning",
    title:"Form Incorrecto!",
    text:"Por favor diligencie correctamente el formulario"
    })
  }
  }
  }

