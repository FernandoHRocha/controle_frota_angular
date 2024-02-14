import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'decimal'})
export class DecimalPipe implements PipeTransform {
  transform(value: any): any {
    return +value ? parseFloat(value).toFixed(2) : null
  }
}


