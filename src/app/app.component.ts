import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="root">
      <a routerLink="/">Lista de tares</a>
      <a routerLink="/form">Formulario de registro de tareas</a>
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .root {
        padding: 1em;

        a {
          margin-left: 1em;
        }
      }
    `,
  ],
})
export class AppComponent {}
