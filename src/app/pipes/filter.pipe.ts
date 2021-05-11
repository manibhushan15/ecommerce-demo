import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform{
  transform(products: any={},searchText: string=''){
    if(!products){
      return {}
    }

    if(searchText == ''){
      return products;
    }

    return products.filter( (items: any) => {
      return items.product_name.toLowerCase().includes(searchText)
    })

  }
}