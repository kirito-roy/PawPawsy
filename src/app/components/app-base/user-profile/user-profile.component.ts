import { UserDetailsUpdate } from './../../core/api/model/user-details-update';
import { firstValueFrom, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputText } from 'primeng/inputtext';
import { AuthService } from 'src/app/components/core/services/auth.service';
import { UserDetailsService } from '../../core/api/user-details.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, InputText, ButtonModule, ImageModule],
  templateUrl: './user-profile.component.html',
  // styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  imgSrc!: string;
  logedIN: boolean = false;
  userName: string = '';
  email: string = '';
  phone: string = '';
  editFirstPanel: boolean = false;
  constructor(
    private auth: AuthService,
    private user: UserDetailsService,
    private Swal: ToastService,
  ) {}
  async ngOnInit() {
    this.isloggedIn();
    if (this.logedIN) {
      await firstValueFrom(
        this.user.getUserDetails().pipe(
          tap((res) => {
            console.log(res);
            this.Swal.showSuccess(res.message);
            this.userName = res.result.username;
            this.email = res.result.email;
            this.phone = res.result.phoneNumber;
            if (res.result.profile_picture != null) {
              this.imgSrc = res.result.profile_picture;
            } else {
              this.imgSrc = 'assets/img/feather1.jpg';
            }
          }),
        ),
      );
    }
  }

  async updateUser() {
    const data: UserDetailsUpdate = {
      username: this.userName,
      phoneNumber: this.phone,
    };
    await firstValueFrom(
      this.user.updateUserDetails(data).pipe(
        tap((res) => {
          console.log(res);
          this.Swal.showSuccess(res.message);
          this.editFirstPanel = false;
        })
      ),
    );
  }
  isloggedIn() {
    const login = this.auth.hasToken();
    this.logedIN = login;
  }
}
