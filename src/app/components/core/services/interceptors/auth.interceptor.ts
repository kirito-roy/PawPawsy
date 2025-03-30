import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/components/core/services/auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log('Token sent:', token); // Debugging token sent

    // Check if token exists and is valid
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (!req.headers.has('Authorization')) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(cloned)
        console.log('Authorization header added');
        return next.handle(cloned);
      }
    }
    return next.handle(req);
  }
}
