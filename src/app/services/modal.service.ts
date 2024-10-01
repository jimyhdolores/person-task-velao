import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injectable,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponentRef?: ComponentRef<ModalComponent>;

  constructor(private appRef: ApplicationRef) {}

  open<T>(component: any): ComponentRef<T> {
    if (!this.modalComponentRef) {
      const modalComponent = createComponent(ModalComponent, {
        environmentInjector: this.appRef.injector,
      });
      this.appRef.attachView(modalComponent.hostView);
      document.body.appendChild(modalComponent.location.nativeElement);

      this.modalComponentRef = modalComponent;
    }

    const componentRef =
      this.modalComponentRef.instance.loadComponent<T>(component);
    return componentRef;
  }

  close() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = undefined;
    }
  }
}
