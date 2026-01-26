import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
  }
];
