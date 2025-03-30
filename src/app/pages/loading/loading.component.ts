
import { Component } from '@angular/core';
import { LoadingService } from 'src/app/components/core/services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  imports: [CommonModule],
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
