import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genresLimit',
})
export class GenresLimitPipe implements PipeTransform {
  transform(genresArr: string[], limit: number): any {
    if (genresArr.length <= limit) {
      return `${genresArr.join(' · ')}`;
    } else {
      const slicedGenres = genresArr.slice(0, limit);
      return `${slicedGenres.join(' · ')} and more`;
    }
  }
}
