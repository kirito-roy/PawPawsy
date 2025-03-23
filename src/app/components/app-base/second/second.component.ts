import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-second',
  imports: [],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {

}
export default[
  {path: '', component: SecondComponent},
  { path: '**', redirectTo: '' }
] as Routes;