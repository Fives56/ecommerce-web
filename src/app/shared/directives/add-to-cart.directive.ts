import { Directive, HostListener, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../core/interfaces/product';
import * as CartActions from '../../core/store/cart/cart.actions';

@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {
  @Input() appAddToCart: Product | undefined | null = null;
  @Input() openCartOnAdd: boolean = false;
  @Input() successMessage: string = 'Product added to cart!';

  private store = inject(Store);

  @HostListener('click')
  onClick(): void {
    if (!this.appAddToCart) {
      console.error('No product provided to addToCart directive');
      return;
    }

    const { id, title, price, image } = this.appAddToCart;

    this.store.dispatch(CartActions.addToCart({
      item: {
        id,
        title,
        price,
        image
      }
    }));

    if (this.openCartOnAdd) {
      this.store.dispatch(CartActions.openCart());
    }
    this.showNotification();
  }

  //TODO: Add notifications toastr
  private showNotification(): void {
    console.log(this.successMessage);
    console.log(`${this.successMessage}`);
  }
}
