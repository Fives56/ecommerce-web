import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartSelectors from '../../core/store/cart/cart.selectors';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CartComponent, AsyncPipe],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private _router = inject(Router);
  authService = inject(AuthService);
  store = inject(Store);
  cartService = inject(CartService);
  isCartOpen$: Observable<boolean> = this.store.select(CartSelectors.selectCartIsOpen);
  totalItems$: Observable<number> = this.store.select(CartSelectors.selectTotalItems);

  /**
   * Handles click on the sign in/out button
   */
  onClick(): void {
    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    } else {
      this.authService.logout();
    }
  }
  
}
