import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from '../featutes/home/home.component';




@NgModule({
  imports: [CommonModule, RouterModule,
    BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        TableModule,
        DropdownModule,
        InputNumberModule,
        ConfirmDialogModule,
        ToastModule,
        DialogModule,
        ReactiveFormsModule,
        InputIcon, IconField, 
        HomeComponent
    
  ],
  declarations: [LayoutComponent,HeaderComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
