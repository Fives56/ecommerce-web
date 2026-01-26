import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../interfaces/cart-item';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: Omit<CartItem, 'quantity'> }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ id: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear');
export const toggleCart = createAction('[Cart] Toggle');
export const openCart = createAction('[Cart] Open');
export const closeCart = createAction('[Cart] Close');