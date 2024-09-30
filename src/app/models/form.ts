import { FormControl } from '@angular/forms';

export interface PersonForm {
  fullName: FormControl<string>;
  age: FormControl<number>;
  skills: FormControl<string[]>;
}
