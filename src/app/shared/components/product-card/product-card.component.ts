import { Component, input } from '@angular/core';
import { Product } from '../../../core/interfaces/product';
import { RatingStarComponent } from '../rating-star/rating-star.component';
import { DecimalPipe } from '@angular/common';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { AddToCartDirective } from '../../directives/add-to-cart.directive';

@Component({
  selector: 'app-product-card',
  imports: [RatingStarComponent, DecimalPipe, ShortDescriptionPipe, AddToCartDirective],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input<Product>();
}
