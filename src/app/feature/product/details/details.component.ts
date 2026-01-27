import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/interfaces/cart-item';
import { Product } from '../../../core/interfaces/product';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  // Signals
  product = signal<Product | null>(null);
  isLoading = signal(true);
  quantity = signal(1);
  isAddingToCart = signal(false);
  isInWishlist = signal(false);
  selectedImage = signal('');
  
  additionalImages = signal<string[]>([]);
  specifications = signal<{key: string, value: string}[]>([]);
  relatedProducts = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProduct();
  }

  /**
   * Load product details
   */
  private loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (!productId) {
      this.isLoading.set(false);
      return;
    }

    this.productService.get(+productId).subscribe({
      next: (product: any) => {
        this.product.set(product);
        this.selectedImage.set(product.image);
        this.setupProductData(product);
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.error('Failed to load product');
        this.isLoading.set(false);
      }
    });
  }

  private setupProductData(product: Product): void {

    this.specifications.set([
      { key: 'Category', value: product.category },
      { key: 'Rating', value: `${ product.rating?.rate } (${ product.rating?.count } reviews)` },
      { key: 'Availability', value: 'In Stock' },
      { key: 'Brand', value: 'Generic' }
    ]);
  }

  //region User actions

  /**
   * Increase quantity of the product
   */
  increaseQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  /**
   * Decrease quantity of the product
   */
  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  /**
   * Add product to cart
   */
  addToCart(): void {
    const product = this.product();
    if (!product) return;

    this.isAddingToCart.set(true);

    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    };
    for (let i = 0; i < this.quantity(); i++) {
      this.cartService.addItem(cartItem);
    }

    this.toastService.success(`${this.quantity()} item(s) added to cart`);
    this.isAddingToCart.set(false);
  }

  /**
   * Go back to the previous page
   */
  goBack(): void {
    this.location.back();
  }
  //endregion
}