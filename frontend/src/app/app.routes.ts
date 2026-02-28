import { Routes } from '@angular/router';
import {MainLayout} from './layout/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    component:MainLayout,
    children:[
      {path: 'up', loadComponent: () => import('./pages/up-page/up-page').then(m => m.UpPage)},
      {path: 'down', loadComponent: () => import('./pages/down-page/down-page').then(m => m.DownPage)},
      {path: 'reset', loadComponent: () => import('./pages/reset-page/reset-page').then(m => m.ResetPage)},
      {path: 'communes', loadComponent: () => import('./pages/communes-page/communes-page').then(m => m.CommunesPage)},
    ]
  }
];
