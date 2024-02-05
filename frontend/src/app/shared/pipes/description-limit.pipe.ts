import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLimit'
})
export class DescriptionLimitPipe implements PipeTransform {

  transform(description: string, limit:number): string {
    return `${description.substring(0,limit)}`;
  }

}
