import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RatingStarComponent } from '../rating-star/rating-star.component';
import { DecimalPipe } from '@angular/common';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { AddToCartDirective } from '../../directives/add-to-cart.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RatingStarComponent, DecimalPipe, ShortDescriptionPipe, AddToCartDirective],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input<Product>();
  router = inject(Router);

  /**
   * Navigate to the product details page
   * @param event Click event
   */
  viewProductDetail(): void {
    if (this.product()) {
      this.router.navigate(['/products/details', this.product()?.id]);
    }
  }
}
