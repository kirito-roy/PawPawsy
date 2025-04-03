import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { AuthGuard } from 'src/app/components/core/services/guards/auth.guard';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { AppBaseComponent } from './app/components/app-base/app-base.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        component: AppBaseComponent,
        // canActivate: [AuthGuard],
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
  {path: 'login', component:LoginComponent},
  { path: 'notfound', component: Notfound },
  { path: 'register', component: RegisterComponent },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' },
];
