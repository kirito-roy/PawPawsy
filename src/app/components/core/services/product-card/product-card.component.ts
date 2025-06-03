import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() optionName: string = '';
  @Input() logo: string = '';
  @Input() image: string = '';
  @Input() price: string = '';
  @Input() Delivery_date: string = '';
 
}
  

