import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './core/services/toast.service';
import { ClearCartModalComponent } from './feature/cart/clear-cart-modal/clear-cart-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, ClearCartModalComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  toastService = inject(ToastService);
}
