import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TestService } from '../core/api/test/test.service';
import { ButtonModule } from 'primeng/button';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-base',
  imports: [RouterModule, ButtonModule],
  standalone: true,
  templateUrl: './app-base.component.html',
  styleUrl: './app-base.component.scss'
})
export class AppBaseComponent {
  constructor(private router: Router , private test :TestService) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
    });
    this.form.setValue({
      id: 1,
    });
  }

  async testapi(){
    const res = await firstValueFrom( this.test.testDATA(1));
    console.log(res);
  }
}
