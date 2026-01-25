import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const productRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    //TODO: Change this to load component
    path: 'list',
    component: ListComponent,
  }
];
