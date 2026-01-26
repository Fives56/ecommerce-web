import { Routes } from '@angular/router';
import { LayoutComponent } from './feature/layout/layout.component';
import { LoginComponent } from './feature/login/login.component';

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
];
