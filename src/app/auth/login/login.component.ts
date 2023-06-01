import Swal from 'sweetalert2';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { usuarioForm } from 'src/app/interfaces/usuarioForm.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  public titulo : string = "Login"


  public loginForm : FormGroup  = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required]
  })

  constructor(
    private fb : FormBuilder,
    private authService :AuthService,
    private router :Router
  ){


  }
  ngOnInit(): void {
    console.log(this.authService.isAuthenticated())
    if(this.authService.isAuthenticated()){
      console.log(this.authService.isAuthenticated())
      this.router.navigateByUrl("/")
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado` ,'info');


    }
  }


  login(){

    if(this.loginForm.invalid){
      return;
    }
    this.authService.login( this.loginForm.value ).subscribe(
      {
        next : response => {
          //let payload  = JSON.parse(atob(response.access_token.split(".")[1]));



          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);

          let usuario = this.authService.usuario;

          this.router.navigateByUrl('/clientes/')
          Swal.fire('Correcto',`Hola ${usuario.username} Has inciaosecion con exito`,'success');
        },
        error : err => {
          if(err.status == 400){
            Swal.fire('Error Login','Usuario o clave incorrectas!', 'error');
          }
        }
      }
    )
  }


}
