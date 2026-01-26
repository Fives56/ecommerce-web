import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState,
    (state: CartState) => state.items
);

export const selectCartIsOpen = createSelector(
    selectCartState,
    (state: CartState) => state.isOpen
);

export const selectTotalItems = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectSubtotal = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectCartTotal = createSelector(
    selectSubtotal,
    (subtotal) => ({
        subtotal,
        total: subtotal,
    })
);