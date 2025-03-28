import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Dashboard,
        
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./app/components/app-base/home/home.component'),
      },
      {
        path: 'uikit',
        loadChildren: () => import('./app/pages/uikit/uikit.routes'),
      },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    ],
  },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
