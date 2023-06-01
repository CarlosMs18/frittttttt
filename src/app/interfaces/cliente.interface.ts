import { Region } from './region.interface';
export interface Cliente{
  id : number
  nombre : string
  email : string
  fechaCreacion : string
  region : Region;
  foto? : string

}
