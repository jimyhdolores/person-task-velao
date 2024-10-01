import { Routes } from '@angular/router';
import { ListTaskPageComponent } from './pages/list-task-page/list-task-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Lista de tareas',
    component: ListTaskPageComponent,
  },
  {
    path: 'form',
    title: 'Formulario',
    loadComponent: () =>
      import('./pages/task-form-page/task-form-page.component'),
  },
];
