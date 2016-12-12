import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'myfilter'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  /*transform(items: any[], args: any[]): any {
    if (!args[0]) return items;
    console.log(args);
    console.log(items);
    return items.filter(item => item.featureTitle.indexOf(args[0]) > -1);
    //console.log(featureGates);
    //featureGates.push(items.filter(item => item.featureDescription.indexOf(args[0]) !== -1));
    //featureGates.push(items.filter(item => item.featureKey.indexOf(args[0]) !== -1))
    //return featureGates;
  }*/
  transform(value, term) {
    if (!term) return [];

    console.log(value);

    let r: any[] = [];
    r = r.concat(value.filter(item => item.featureTitle.indexOf(term) > -1));
    r = r.concat(value.filter(item => item.description.indexOf(term) > -1));

    console.log("r");
    console.log(r);

    value = value.filter(item => item.featureTitle.indexOf(term) > -1);
    value = value.concat(value.filter(item => item.description.indexOf(term) > -1));

    console.log(value);

    //value.filter(item => item.featureDescription.indexOf(term) > -1);

    if (r.length==0)
    {
      r = [{"featureTitle": "NO RECORDS FOUND"}]
    }

    return r;

    /*return value.filter(item => item.featureTitle.indexOf(term) > -1);*/
  }
}
