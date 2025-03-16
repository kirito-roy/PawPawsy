import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Msg } from './service/msg/msg.service';
import { firstValueFrom } from 'rxjs';
import { Test1Service } from './service/apis/test1.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
 

  constructor(private msgService: Msg, private fb: FormBuilder , private api :Test1Service) {
    // Initialize the FormGroup to avoid undefined
    
  }

  async ngOnInit(): Promise<void> {
     // Add fetched student data to the list.
  }
  
}
