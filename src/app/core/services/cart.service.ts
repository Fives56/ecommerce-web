import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from '../store/cart/cart.actions';
import * as CartSelectors from '../store/cart/cart.selectors';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  store = inject(Store);
  items$ = this.store.select(CartSelectors.selectCartItems);
  isOpen$ = this.store.select(CartSelectors.selectCartIsOpen);
  totalItems$ = this.store.select(CartSelectors.selectTotalItems);
  subtotal$ = this.store.select(CartSelectors.selectSubtotal);
  cartTotal$ = this.store.select(CartSelectors.selectCartTotal);

  /**
   * Add an item to the cart
   * @param product Product to add to the cart
   */
  addItem(product: Omit<CartItem, 'quantity'>): void {
    this.store.dispatch(CartActions.addToCart({ item: product }));
  }

  /**
   * Remove an item from the cart
   * @param id ID of the item to remove
   */
  removeItem(id: number): void {
    this.store.dispatch(CartActions.removeFromCart({ id }));
  }

  /**
   * Update the quantity of an item in the cart
   * @param id ID of the item to update
   * @param quantity New quantity
   */
  updateQuantity(id: number, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ id, quantity }));
  }

  /**
   * Clear the cart items
   */
  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  /**
   * Open the cart offcanvas
   */
  openCart(): void {
    this.store.dispatch(CartActions.openCart());
  }

  /**
   * Close the cart offcanvas
   */
  closeCart(): void {
    this.store.dispatch(CartActions.closeCart());
  }
}
