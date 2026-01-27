import { Directive, HostListener, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../core/interfaces/product';
import * as CartActions from '../../core/store/cart/cart.actions';
import { ToastService } from '../../core/services/toast.service';

@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {
  @Input() appAddToCart: Product | undefined | null = null;
  @Input() openCartOnAdd: boolean = false;
  @Input() successMessage: string = 'Product added to cart!';

  private _store = inject(Store);
  private _toastService = inject(ToastService);

  @HostListener('click')
  onClick(): void {
    if (!this.appAddToCart) {
      console.error('No product provided to addToCart directive');
      return;
    }

    const { id, title, price, image } = this.appAddToCart;

    this._store.dispatch(CartActions.addToCart({
      item: {
        id,
        title,
        price,
        image
      }
    }));

    if (this.openCartOnAdd) {
      this._store.dispatch(CartActions.openCart());
    }
    this.showNotification();
  }

  /**
   * Show a success notification
   */
  private showNotification(): void {
    this._toastService.success(this.successMessage);
  }
}
