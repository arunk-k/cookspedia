import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(recipelist: any[], ...args: string[]) {

    if (args[0] == '') {
      return recipelist
    }

    if (args[0] && args[1] == 'cuisine') {
      return recipelist.filter((item: any) => item.cuisine.toLowerCase().includes(args[0].toLowerCase()))
    }

    if (args[0] && args[1] == 'mealType') {
      return recipelist.filter((item: any) => item.mealType.includes(args[0]))
    }

    return recipelist

  }

}
