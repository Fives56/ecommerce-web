import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import * as CartActions from '../../core/store/cart/cart.actions';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import { CartItem } from '../../core/interfaces/cart-item';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  isOpen = input(false);
  closed = output<void>();

  items$: Observable<CartItem[]>;
  subtotal$: Observable<number>;
  totalItems$: Observable<number>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.subtotal$ = this.store.select(CartSelectors.selectSubtotal);
    this.totalItems$ = this.store.select(CartSelectors.selectTotalItems);
  }

  /**
   * Close the cart offcanvas
   */
  close(): void {
    this.store.dispatch(CartActions.closeCart());
    this.closed.emit();
  }

  /**
   * Remove an item from the cart
   * @param id Product id
   */
  removeItem(id: number): void {
    this.store.dispatch(CartActions.removeFromCart({ id }));
  }

  /**
   * Update the quantity of an item in the cart
   * @param id Product id
   * @param quantity New quantity
   */
  updateQuantity(id: number, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ id, quantity }));
  }

  /**
   * Clear the cart
   */
  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  /**
   * Navigate to the checkout page and close the cart offcanvas
   */
  goToCheckout(): void {
    this.close();
    this.router.navigate(['/checkout']);
  }
}
