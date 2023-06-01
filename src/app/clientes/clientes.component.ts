import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
        constructor(){
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if(modalBackdrop){
          modalBackdrop.classList.remove('modal-backdrop');
        }
      }
}
