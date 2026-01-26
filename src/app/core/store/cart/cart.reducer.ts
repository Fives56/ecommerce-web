import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialState } from './cart.state';

export const cartReducer = createReducer(
  initialState,
  
  on(CartActions.addToCart, (state, { item }) => {
    const existingItem = state.items.find(i => i.id === item.id);
    
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(i =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      };
    }
    
    return {
      ...state,
      items: [...state.items, { ...item, quantity: 1 }]
    };
  }),
  
  on(CartActions.removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),
  
  on(CartActions.updateQuantity, (state, { id, quantity }) => ({
    ...state,
    items: quantity <= 0
      ? state.items.filter(item => item.id !== id)
      : state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
  })),
  
  on(CartActions.clearCart, state => ({
    ...state,
    items: []
  })),
  
  on(CartActions.toggleCart, state => ({
    ...state,
    isOpen: !state.isOpen
  })),
  
  on(CartActions.openCart, state => ({
    ...state,
    isOpen: true
  })),
  
  on(CartActions.closeCart, state => ({
    ...state,
    isOpen: false
  }))
);