import { Routes } from '@angular/router';
import { LayoutComponent } from './feature/layout/layout.component';
import { checkoutGuard } from './core/guards/checkout.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: LayoutComponent,
    loadChildren: () => import('./feature/product/product.routes').then(m => m.productRoutes)
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'checkout',
    canActivate: [checkoutGuard],
    loadComponent: () => import('./feature/checkout/checkout.component').then(m => m.CheckoutComponent),
  },
];
