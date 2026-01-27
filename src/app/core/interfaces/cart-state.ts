import { CartItem } from "./cart-item";
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  showClearCartModal: boolean;
}