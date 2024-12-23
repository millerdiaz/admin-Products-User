import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserService)
  formRegister! :FormGroup

  constructor(private fb:FormBuilder, private router : Router){
    this.formRegister = this.fb.group({
      nombre:['', []],
      apellidos:['', []],
      correo:['', []],
      contrasena:['', []],
      rol: ['supervisor', []]
    })
  }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
        this.router.navigate(['home'])
    }
  }

  register(){
    this.userService.addUser(this.formRegister.value).subscribe({
      next:(resApi:any)=>{
        Swal.fire({
          icon:"success",
          title:"Bienvenido!",
          text:`${resApi.correo}`
      })
      },
      error:(error:any)=> {
          console.log(error);
          Swal.fire({
              icon:"error",
              title:"Usuario no registrado!",
              text:`${error.error.error}`
          })
      }

    })
  }


}
