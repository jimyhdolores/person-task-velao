import { Routes } from '@angular/router';
import { ListTaskPageComponent } from './list-task-page/list-task-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Lista de tareas',
    component: ListTaskPageComponent,
  },
  {
    path: 'form',
    title: 'Formulario',
    loadComponent: () => import('./task-form-page/task-form-page.component'),
  },
];
