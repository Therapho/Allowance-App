import { Injectable } from '@angular/core';
import { Store } from '../../types/store';

@Injectable({
  providedIn: 'root'
})
export class BusyService extends Store<boolean> {
constructor() {
  super(false);
}


}
