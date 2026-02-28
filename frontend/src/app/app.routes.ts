import {Routes} from '@angular/router';
import {MainLayout} from './layout/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/up',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'up',
        title: 'Up Page | Counter App',
        loadComponent: () => import('./pages/up-page/up-page').then(m => m.UpPage)
      },
      {
        path: 'down',
        title: 'Down Page | Counter App',
        loadComponent: () => import('./pages/down-page/down-page').then(m => m.DownPage)
      },
      {
        path: 'reset',
        title: 'Reset Page | Counter App',
        loadComponent: () => import('./pages/reset-page/reset-page').then(m => m.ResetPage)
      },
      {
        path: 'communes',
        title: 'Communes Page | Counter App',
        loadComponent: () => import('./pages/communes-page/communes-page').then(m => m.CommunesPage)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/up',
    pathMatch: 'full'
  }

];
