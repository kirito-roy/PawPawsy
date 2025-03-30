import { firstValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from 'src/app/components/core/services/auth.service';
import { AppFloatingConfigurator } from 'src/app/layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  email: string = '';
  checked: boolean = false;
  confirm_password: string = '';
  constructor(private auth: AuthService,private route : Router) {}

  async signupF() {
    if (
      this.first_name == '' ||
      this.last_name == '' ||
      this.password == '' ||
      this.email == '' ||
      this.confirm_password == ''
    ) {
      alert('Please fill all fields');
      return;
    }
    if(this.checked == false){
      alert('Please accept the terms and conditions');
      return;
    }
    if (this.password != this.confirm_password) {
      alert('Password and Confirm Password do not match');
      return;
    }
    const payload = {
      username : this.first_name + ' ' + this.last_name,
      email: this.email,
      password: this.password,
    }
    const res = await firstValueFrom(this.auth.register(payload));
    if (res.message == "User registered successfully") {
      this.first_name = '';
      this.last_name = '';
      this.password = '';
      this.email = '';
      this.confirm_password = '';
      this.checked = false;
      this.route.navigate(['/']);
    }
  }
}
