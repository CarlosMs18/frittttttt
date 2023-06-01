import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { navBarI } from '../../interfaces/navbar.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    public authService : AuthService,
    private router : Router
  ){

  }
  ngOnInit(): void {}

  logout(){

    this.authService.logout()

    Swal.fire('Logout',`Hola ${this.authService!.usuario!.username} has cerrado sesion con exito!`, 'success');

    this.router.navigateByUrl("/auth/login")


  }

  titulo : string = 'Dashboard';

  barraNavegacion : navBarI[] = [
    {
      titulo : 'Home',
      path : '/clientes/'
    },
    {
      titulo : 'Lista Cliente',
      path : '/clientes/'
    },
    {
      titulo : 'Crear Cliente',
      path : '/clientes/form-cliente'
    }
  ];
}
