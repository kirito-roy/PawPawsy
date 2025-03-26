import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-base',
  imports: [RouterModule],
  templateUrl: './app-base.component.html',
  styleUrl: './app-base.component.scss'
})
export class AppBaseComponent {

}
export default [
  {path: '', component:AppBaseComponent },
  { path: 'home', loadChildren: () => import('./home/home.component') },
  { path: '**', redirectTo: '' }
] as Routes;