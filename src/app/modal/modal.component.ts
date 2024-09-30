import {
  Component,
  ComponentRef,
  inject,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-container',
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick()"></div>
    <div class="modal-content">
      <button class="close-btn" (click)="closeModal()">✕</button>
      <ng-container #modalContent></ng-container>
    </div>
  `,
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @ViewChild('modalContent', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;
  private currentComponentRef?: ComponentRef<any>;
  private modalService = inject(ModalService);
  closeModalSignal: WritableSignal<boolean> = signal(false);

  loadComponent<T>(component: any): ComponentRef<T> {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
    }

    const componentRef = this.viewContainerRef.createComponent<T>(component);
    this.currentComponentRef = componentRef;

    return componentRef;
  }

  closeModal() {
    this.modalService.close();
  }

  onBackdropClick() {
    this.closeModal();
  }
}
