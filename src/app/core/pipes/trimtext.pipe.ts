import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimtext',
  standalone: true
})
export class TrimtextPipe implements PipeTransform {

  transform(text:string, limit:number):string {
    return text.split(' ',limit).join(" ") ;
  }

}
