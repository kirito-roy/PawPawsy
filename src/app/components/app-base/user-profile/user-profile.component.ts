import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  imgSrc!:string;
  logedIN:boolean=false;
  constructor(){

  }
  ngOnInit(): void {
    this.imgSrc='assets/img/feather1.jpg';
    this.logedIN=true;
  }

}
