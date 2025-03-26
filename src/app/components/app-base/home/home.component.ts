import { Component } from '@angular/core';
import { Router, RouterModule,Routes } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

}
export default [
  { path: '', component: HomeComponent },
  { path: 'second', loadChildren: () => import('../second/second.component') },
  { path: '**', redirectTo: '/notfound' }
] as Routes;