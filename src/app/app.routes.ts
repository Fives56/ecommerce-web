import { Routes } from '@angular/router';
import { ListComponent } from './feature/product/list/list.component';
import { LayoutComponent } from './feature/layout/layout.component';
import { productRoutes } from './feature/product/product.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    //TODO: Change this to load children of product routes
    path: 'products',
    component: LayoutComponent,
    children: productRoutes,
  }
];
