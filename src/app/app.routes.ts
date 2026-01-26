import { Routes } from '@angular/router';
import { LayoutComponent } from './feature/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: LayoutComponent,
    loadChildren: () => import('./feature/product/product.routes').then(m => m.productRoutes)
  }
];
