import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {
  private base_url = "http://localhost:8080";
  transform(img : string): string{

    if(!img){


      return `${this.base_url}/api/uploads/img/no-image`;
    }else{

      return `${this.base_url}/api/uploads/img/${img}`;
    }

  }

}
