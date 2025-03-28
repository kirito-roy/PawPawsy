import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PopoverModule } from 'primeng/popover';
import { DrawerModule } from 'primeng/drawer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    AppConfigurator,
    IconFieldModule,
    FormsModule,
    InputIconModule,
    InputTextModule,
    InputGroupModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
    ToastModule,
    ConfirmDialogModule,
    PasswordModule,
    MultiSelectModule,
    PopoverModule,
    DrawerModule,
  ],
  templateUrl: './topbar.html',
})
export class AppTopbar {
  items!: MenuItem[];
  themeMode: string = 'Light';
  search: boolean = false;
  searchText: string = '';
  SearchBar:string = "";
  barlist=["whats on your mind?","Looking for something?","Search here","Search for something","Search for a product"];
  constructor(public layoutService: LayoutService) {}
  ngOnInit() {
  }
  toggleSearchPhone() {
    this.SearchBar = this.barlist[Math.floor(Math.random() * this.barlist.length)];

    this.search =!this.search;
  }
  searchItems() {
    console.log(this.searchText);
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
    this.themeMode = this.layoutService.layoutConfig().darkTheme
      ? 'Dark'
      : 'Light';
    // console.log(this.themeMode);
  }
}
