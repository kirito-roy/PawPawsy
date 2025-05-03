import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputText } from 'primeng/inputtext';
import {AuthService} from "src/app/components/core/services/auth.service";

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,FormsModule,InputText,ButtonModule,ImageModule],
  templateUrl: './user-profile.component.html',
  // styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  imgSrc!:string;
  logedIN:boolean=false;
  userName:string='User';
  email:string='user@gmail.com';
  phone:string='1234567890';
  editFirstPanel:boolean=false;
  constructor(private auth :AuthService){

  }
  ngOnInit(): void {
    this.imgSrc='assets/img/feather1.jpg';
    this.isloggedIn();
  }
  isloggedIn(){
    const login = this.auth.hasToken();
    this.logedIN = login;
  }

}
