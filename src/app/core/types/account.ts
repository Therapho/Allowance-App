import { Entity } from './entity';
import { EmailValidator } from '@angular/forms';

export interface Account extends Entity {
  email: string;
  name: string;
  balance: number;
}
