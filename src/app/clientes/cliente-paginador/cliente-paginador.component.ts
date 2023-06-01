import { Component, Input, OnInit , OnChanges,SimpleChanges} from '@angular/core';
import { Paginacion } from 'src/app/interfaces/paginacion.interface';

@Component({
  selector: 'app-cliente-paginador',
  templateUrl: './cliente-paginador.component.html',
  styleUrls: ['./cliente-paginador.component.css']
})
export class ClientePaginadorComponent implements OnInit, OnChanges{
    @Input()
    paginador! : Paginacion
    paginas : number[] = [];
    desde : number = 0;
    hasta : number = 0;

    constructor(){


    }


  ngOnInit(): void {
    this.initPaginator();

  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){ //si el paginador  actu tiene una version anterior, que haya cambiado
      this.initPaginator()

    }
  }
    private initPaginator(){

      this.desde =Math.min(Math.max(1,this.paginador.number-4), this.paginador.totalPages-5);
      this.hasta = Math.max(Math.min(this.paginador.totalPages,this.paginador.number +4), 6);

      if(this.paginador.totalPages > 5){
        this.paginas = new Array(this.hasta - this.desde +1).fill(0).map((valor, indice) => indice+ this.desde);

      }else{
        this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice+1);
      }


    }
}
