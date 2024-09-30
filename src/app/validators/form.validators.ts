import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export function atLeastOneControlFilled(): ValidatorFn {
  return (formArray: AbstractControl): { [key: string]: boolean } | null => {
    const controls = (formArray as FormArray).controls;

    const atLeastOneFilled = controls.some((control) => control.value);

    return atLeastOneFilled ? null : { allEmpty: true };
  };
}
