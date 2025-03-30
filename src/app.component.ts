import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './app/components/core/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        setInterval(() => {
          const token = this.authService.getToken();
          if (token && this.authService.isTokenExpired(token)) {
            this.authService.logout(); // Auto logout if expired
          }
        }, 5000); // Check every 5 seconds
      }
}
