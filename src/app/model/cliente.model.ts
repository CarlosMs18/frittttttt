import { Factura } from './factura.model';
import { RegionC } from './region.model';
export class ClienteM{
  id : number;
  nombre : string;
  apellido : string;
  fechaCreacion : string;
  email : string;
  region : RegionC;
  facturas  :Factura[] = [];
  foto? : string;
}
