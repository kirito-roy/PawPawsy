import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/components/core/services/auth.service';
import { LoadingService } from 'src/app/components/core/services/loading/loading.service';
import { Observable, finalize } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const token = this.authService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      if (!req.headers.has('Authorization')) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Cloned request with token:', cloned);
        return next.handle(cloned).pipe(
          finalize(() => this.loadingService.hide())
        );
      }
    }

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
