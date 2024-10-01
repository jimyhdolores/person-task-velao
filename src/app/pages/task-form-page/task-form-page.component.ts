import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddPersonComponent } from '../../components/add-person/add-person.component';
import { PersonForm } from '../../models/form';
import { AssociatedPerson } from '../../models/task.interface';
import { TasksService } from '../../services/tasks.service';
import { atLeastOneControlFilled } from '../../validators/form.validators';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AddPersonComponent],
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss'],
})
export default class TaskFormPageComponent {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _tasksService = inject(TasksService);
  resetFormFlag = false;

  form = this._fb.group({
    task: ['', Validators.required],
    deadline: ['', Validators.required],
    associatedPerson: this._fb.control<AssociatedPerson>({
      age: 0,
      fullName: '',
      skills: [],
    }),
    persons: this._fb.array<FormGroup<PersonForm>>(
      [],
      atLeastOneControlFilled()
    ),
  });

  save(): void {
    const { task, deadline, persons } = this.form.getRawValue();
    this._tasksService.addTask({ task, deadline, persons });
    this.resetFormFlag = true;
    this.personsField.clear();
    this.form.reset();
  }

  addPerson() {
    const { fullName, age, skills } = this.associatedPersonField.value;

    const personExist = this.personsField
      .getRawValue()
      .find((item) => item.fullName === fullName);

    if (personExist) {
      return;
    }

    const itemPerson = this._fb.group<PersonForm>({
      fullName: this._fb.control(fullName),
      age: this._fb.control(age),
      skills: this._fb.control(skills),
    });

    this.personsField.push(itemPerson);
  }

  deletePerson(index: number) {
    this.personsField.removeAt(index);
  }

  get associatedPersonField() {
    return this.form.controls.associatedPerson;
  }

  get personsField() {
    return this.form.controls.persons;
  }

  formControlError(control: FormControl, validator: string): boolean {
    return control.hasError(validator) && control.invalid && control.touched;
  }
}
