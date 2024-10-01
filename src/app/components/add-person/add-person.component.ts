import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssociatedPerson } from '../../models/task.interface';
import { atLeastOneControlFilled } from '../../validators/form.validators';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddPersonComponent),
      multi: true,
    },
  ],
})
export class AddPersonComponent implements ControlValueAccessor, OnChanges {
  @Output() clickAddPerson = new EventEmitter();
  @Input() isEdit = false;
  @Input() resetFormFlag = false;

  private readonly _fb = inject(NonNullableFormBuilder);

  private _onChanged: Function = (_value: AssociatedPerson) => {};
  private _onTouched: Function = () => {};

  form = this._fb.group({
    fullName: ['', [Validators.required, Validators.minLength(5)]],
    age: [0, [Validators.required, Validators.min(18)]],
    skills: this._fb.array<string>([], atLeastOneControlFilled()),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetFormFlag'] && changes['resetFormFlag'].currentValue) {
      this.form.controls.skills.clear();
    }
  }

  addSkill() {
    this.skillsField.push(this._fb.control('', Validators.required));
  }

  get skillsField() {
    return this.form.controls.skills;
  }

  removeSkill(index: number) {
    this.skillsField.removeAt(index);
  }

  addPerson() {
    if (this.form.invalid) {
      return;
    }

    this.clickAddPerson.emit(this.form.getRawValue());
    this.form.controls.skills.clear();
    this.form.reset();
  }

  writeValue(value: AssociatedPerson): void {
    if (value) {
      this.form.patchValue(value);
    }
  }

  registerOnChange(fn: (value: AssociatedPerson) => void): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.form) {
      isDisabled ? this.form.disable() : this.form.enable();
    }
  }

  formControlError(control: FormControl, validator: string): boolean {
    return control.hasError(validator) && control.invalid && control.touched;
  }

  propagateChange(value: AssociatedPerson) {
    if (this._onChanged) {
      this._onChanged(value);
      this._onTouched();
    }
  }

  patchSkills(skills: string[]) {
    this.form.controls.skills.clear();

    skills.forEach((skill) => {
      this.form.controls.skills.push(
        this._fb.control(skill, Validators.required)
      );
    });
    this.form.controls.skills.patchValue(skills);
  }
}
