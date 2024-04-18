import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(path: string, width: string): string {
    return `https://image.tmdb.org/t/p/${width}${path}`;
  }
}
