import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartItem } from '../../core/interfaces/cart-item';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isLoading = signal(false);
  cartItems = signal<CartItem[]>([]);

  subtotal$ = this.cartService.subtotal$;

  // Computed values
  shipping = computed(() => {
    const subtotal = this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal > 50 ? 0 : 9.99;
  });

  total = computed(() => {
    const subtotal = this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal + this.shipping();
  });

  checkoutForm!: FormGroup;

  ngOnInit(): void {
    const user = this.authService.getUser();

    this.checkoutForm = this.fb.group({
      firstName: [user?.name?.firstname || '', Validators.required],
      lastName: [user?.name?.lastname || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      address: [user?.address?.street || '', Validators.required],
      city: [user?.address?.city || '', Validators.required],
      zipCode: [user?.address?.zipcode || '', Validators.required],
      paymentMethod: ['creditCard', Validators.required]
    });

    this.cartService.items$.subscribe(items => {
      this.cartItems.set(items);

      if (items.length === 0 && this.router.url === '/checkout') {
        this.toastService.info('Your cart is empty');
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      this.toastService.error('Please fill all required fields');
      return;
    }

    if (this.cartItems().length === 0) {
      this.toastService.error('Your cart is empty');
      this.router.navigate(['/']);
      return;
    }

    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      this.cartService.clearCart();
      this.toastService.success('Order placed successfully!');
      this.router.navigate(['/']);
      this.isLoading.set(false);
    }, 2000);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}