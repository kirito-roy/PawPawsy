import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, RouterModule } from '@angular/router';
import { AuthService } from './app/components/core/services/auth.service';
import { LoadingService } from './app/components/core/services/loading/loading.service';
import { LoadingComponent } from './app/pages/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoadingComponent, RouterModule],
  template: `
    <app-loading></app-loading>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // ✅ Auto logout if token expires
    setInterval(() => {
      const token = this.authService.getToken();
      if (token && this.authService.isTokenExpired(token)) {
        this.authService.logout(); // Auto logout if expired
      }
    }, 5000); // Check every 5 seconds

    // ✅ Track Router Events to show/hide loading
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show(); // Show loading on route start
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loadingService.hide(); // Hide loading on route end
      }
    });
  }
}
