import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TestService } from '../core/api/test/test.service';
import { firstValueFrom, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductCardComponent } from '../core/services/product-card/product-card.component';


import { ToastService } from '../core/services/toast.service';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-base',
  imports: [
    ProductCardComponent,
    RouterModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './app-base.component.html',
  styleUrl: './app-base.component.scss',
  providers: [MessageService],
})
export class AppBaseComponent {
  constructor(
    private router: Router,
    private test: TestService,
    private toastService: ToastService,
    private service: MessageService,
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
    });
    this.form.setValue({
      id: 1,
    });
  }

  async testapi() {
    await firstValueFrom(
      this.test.testDATA(1).pipe(
        tap((res) => {
          try {
            console.log(res);
            this.toastService.showSuccess(res.status, false);
          } catch (e) {
            this.toastService.showError('Error', false);
          }
        }),
      ),
    );
  }
}
