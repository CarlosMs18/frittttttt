import { ClienteM } from './cliente.model';
import { ItemFactura } from './item-factura.model';
export class Factura{
    id : number;
    descripcion : string;
    observacion : string;
    items :Array<ItemFactura> = [];
    cliente : ClienteM;
    total:number;
    createAt : string;


    calcularGranTotal(): number{
      this.total = 0;
      this.items.forEach((item : ItemFactura) => {
        this.total = this.total + item.calcularImporte();
      })
      return this.total;
    }
}
