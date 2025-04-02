import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { first, firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/components/core/services/auth.service';
import { AppFloatingConfigurator } from 'src/app/layout/component/app.floatingconfigurator';
import { ToastService } from 'src/app/components/core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';

  password: string = '';

  checked: boolean = false;
  constructor(private auth: AuthService, private router: Router , private toastService:ToastService) {}
  async loginF() {
    console.log('Login', this.email, this.password, this.checked);
    
    try {
      const res = await firstValueFrom(
        this.auth.login({ email: this.email, password: this.password })
      );
  
      if (res.message === 'Login successful') {
        this.toastService.showSuccess('Logged in successfully!');
        this.router.navigate(['/']);
      } else {
        this.toastService.showError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      this.toastService.showError('An error occurred during login.');
    }
  }
}
