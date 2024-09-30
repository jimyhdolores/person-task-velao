import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPersonComponent } from '../add-person/add-person.component';
import { AssociatedPerson, IAdminTask } from '../models/task.interface';
import { ModalService } from '../services/modal.service';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-list-task-page',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './list-task-page.component.html',
  styleUrls: ['./list-task-page.component.scss'],
})
export class ListTaskPageComponent implements OnInit {
  private readonly _tasksService = inject(TasksService);
  private readonly _modalService = inject(ModalService);

  listTask: IAdminTask[] = [];
  listTaskBackup: IAdminTask[] = [];

  ngOnInit(): void {
    this.listTask = this._tasksService.getTasks();
    this.listTaskBackup = [...this._tasksService.getTasks()];
  }

  addPerson(index: number): void {
    const componentRef =
      this._modalService.open<AddPersonComponent>(AddPersonComponent);
    if (componentRef) {
      componentRef.instance.clickAddPerson.subscribe((data) => {
        this.listTask[index].task.persons.push(data);
        this._modalService.close();
      });
    }
  }

  editPerson(indexTask: number, indexPerson: number, person: AssociatedPerson) {
    const componentRef =
      this._modalService.open<AddPersonComponent>(AddPersonComponent);
    if (componentRef) {
      componentRef.instance.isEdit = true;
      componentRef.instance.form.patchValue(person);
      componentRef.instance.patchSkills(person.skills);

      componentRef.instance.clickAddPerson.subscribe((data) => {
        this.listTask[indexTask].task.persons[indexPerson] = data;
        this._modalService.close();
      });
    }
  }

  onRadioChange(selectedValue: Event) {
    const input = selectedValue.target as HTMLInputElement;
    if (input.value == 'todas') {
      this.listTask = this.listTaskBackup;
    } else if (input.value === 'completadas') {
      this.listTask = this.listTaskBackup.filter(({ complete }) => complete);
    } else {
      this.listTask = this.listTaskBackup.filter(({ complete }) => !complete);
    }
  }
}
