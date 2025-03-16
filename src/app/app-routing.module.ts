import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LayoutComponent,
          // children: [
          //     {
          //         path: '',
          //         loadChildren: () =>
          //             import('./').then(
          //                 (m) => m.MasterModule
          //             ),
          //         data: { breadcrumb: 'MasterModule' },
          //     },
          //     {
          //         path: 'pension-process',
          //         loadChildren: () =>
          //             import(
          //                 './features/pensions-process/pensions-process.module'
          //             ).then((m) => m.PensionsProcessModule),
          //         data: { breadcrumb: 'PensionsProcessModule' },
          //     },
          //     {
          //         path: 'pension-report',
          //         loadChildren: () =>
          //             import(
          //                 './features/pension-reports/pension-reports.module'
          //             ).then((m) => m.PensionReportsModule),
          //         data: { breadcrumb: 'PensionReportsModule' },
          //     },
          // ],
          data: { breadcrumb: 'CTS AppLayoutComponent' }
        },
        // {
        //     path: 'login',
        //     component: LoginComponent,
        //     data: { breadcrumb: 'LoginComponent' },
        // },
        // {
        //     path: 'static-login',
        //     component: StaticLoginComponent,
        //     data: { breadcrumb: 'StaticLoginComponent' },
        // },
        // { path: 'notfound', component: NotFoundComponent },
        // { path: 'server-down', component: ServerDownComponent },
        // { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload'
      }
    )
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
