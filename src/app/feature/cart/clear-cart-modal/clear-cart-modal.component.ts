import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import * as CartActions from '../../../core/store/cart/cart.actions';
import * as CartSelectors from '../../../core/store/cart/cart.selectors';

@Component({
  selector: 'app-clear-cart-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './clear-cart-modal.component.html'
})
export class ClearCartModalComponent {
  private store = inject(Store);

  isOpen$: Observable<boolean>;
  itemCount$: Observable<number>;

  constructor() {
    this.isOpen$ = this.store.select(CartSelectors.selectShowClearCartModal);
    this.itemCount$ = this.store.select(CartSelectors.selectTotalItems);
  }

  /**
   * Close the clear cart modal
   */
  close(): void {
    this.store.dispatch(CartActions.closeClearCartModal());
  }

  /**
   * Confirm the clear cart action
   */
  confirm(): void {
    this.store.dispatch(CartActions.confirmClearCart());
  }
}