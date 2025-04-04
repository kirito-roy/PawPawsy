import { Component, HostListener } from '@angular/core';
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
import { AuthService } from 'src/app/components/core/services/auth.service';
import { SearchService } from 'src/app/components/core/api/search.service';
import { firstValueFrom } from 'rxjs';
import { Search } from 'src/app/components/core/api/model/search';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';

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
    TableModule,
    ListboxModule,
    DialogModule,
  ],
  templateUrl: './topbar.html',
})
export class AppTopbar {
  items!: MenuItem[];
  themeMode: string = 'Light';
  search: boolean = false;
  searchText: string = '';
  searchData: Search = {
    data: '',
  };
  SearchBar: string = '';
  logedin: boolean = false;
  username: string = '';
  barlist = [
    'whats on your mind?',
    'Looking for something?',
    'Search here',
    'Search for something',
    'Search for a product',
  ];
  selectedsearch: { search: string } = {
    search: '',
  };
  searches!: any[];
  visible: boolean = false;
  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private searchdata: SearchService
  ) {}
  ngOnInit() {
    this.logedin = this.authService.hasToken();
    if (this.logedin) {
      this.username = localStorage.getItem('user') || '';
    }
  }
  async toggleSearchPhone() {
    this.addSearchBarName();
    this.search = !this.search;
    const res = await firstValueFrom(this.searchdata.searchedDATA());
    console.log(res);
    this.searches = res.result;
  }
  itemselected() {
    this.searchText = this.selectedsearch.search;
  }
  async searchItems() {
    this.searchData.data = this.searchText;
    const res = await firstValueFrom(
      this.searchdata.searchDATA(this.searchData)
    );
    console.log(res);
    this.search = false;
  }
  async searchedItems() {
    this.addSearchBarName();
    this.visible = !this.visible;
    const res = await firstValueFrom(this.searchdata.searchedDATA());
    console.log(res);
    this.searches = res.result;
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
  logout() {
    this.authService.logout();
    this.username = '';
    this.logedin = false;
  }
  addSearchBarName() {
    this.SearchBar =
      this.barlist[Math.floor(Math.random() * this.barlist.length)];
  }

  //   this.authService.logout();
}
