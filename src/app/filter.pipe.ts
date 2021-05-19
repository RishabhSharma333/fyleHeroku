import { Pipe, PipeTransform } from '@angular/core';
import { bank } from './dashboard/dashboard.component';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(banks: any, input: string): any[] {
    if (input||input=='') {
      var ret: any[] = [];
      for (let prop in banks) {
        var b = banks[prop];
        if (b.address.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          ret.push(b);
        } else if (b.branch.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          ret.push(b);
        } else if (b.bank_name&&
          b.bank_name.toLowerCase().indexOf(input.toLowerCase()) >= 0
        ) {
          ret.push(b);
        } else if (b.city.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          ret.push(b);
        } else if (b.district.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          ret.push(b);
        } else if (b.state.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          ret.push(b);
        }
      }
      return ret;
    } else {
      return banks;
    }
  }
}
