import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(recipesArray: any, keyword: string) {
    if (keyword == "") {
      return recipesArray
    }
    return recipesArray.filter((item: any) => item.name.toLowerCase().includes(keyword.toLowerCase()))
  }

}
