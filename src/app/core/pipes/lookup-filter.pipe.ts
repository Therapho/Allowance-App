import { Pipe, PipeTransform } from '@angular/core';
import {Lookup} from '../entities/lookup';

@Pipe({
  name: 'lookupFilter'
})
export class LookupFilterPipe implements PipeTransform {

  transform(items: Lookup[], id: number): string {
    if (items == null || id == null) { return null; }
    const results = items.filter(item => item.id === id);
    return results ? results[0].name : null;
  }

}
