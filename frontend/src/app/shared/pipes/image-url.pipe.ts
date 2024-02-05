import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

}
