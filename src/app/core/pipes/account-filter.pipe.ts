import { Pipe, PipeTransform } from '@angular/core';
import { Account} from '../entities/account';

@Pipe({
  name: 'accountFilter'
})
export class AccountFilterPipe implements PipeTransform {

  transform(items: Account[], useridentifier: string): string {
    if (items == null || useridentifier == null) { return null; }
    const results = items.filter((item: Account) => item.userIdentifier === useridentifier);
    return results ? results[0].name : null;
  }

}
