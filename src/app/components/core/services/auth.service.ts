import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://petbackend.roy184433.workers.dev/api/user';
  private tokenKey = 'token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}/signup`, credentials).subscribe(
        (response) => {
          this.saveToken(response.token);
          this.saveUser(response.user);
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Register error:', error);
          observer.error(error);
        }
      );
      
    });
  }

  // Login User and Save Token
  login(credentials: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe(
        (response) => {
          if (response.token) {
            this.saveToken(response.token);
            this.saveUser(response.user);
            observer.next(response);
            observer.complete();
          } else {
            observer.error('Token not received from API.');
          }
        },
        (error) => {
          console.error('Login error:', error);
          observer.error(error);
        }
      );
    });
  }

  saveUser(user: any): void {
    const username = user.username.split(" ")[0];
    localStorage.setItem('user', username);
  }
  // Save Token to Local Storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true);
  }
  isTokenExpired(token: string): boolean {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);

    // If no exp, assume expired
    if (!decodedToken?.exp) {
      this.logout(); // Auto logout
      return true;
    }

    if (decodedToken.exp < currentTime) {
      this.logout(); // Auto logout
      return true;
    }

    return false;
  }

  // Check if Token Exists
  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Get Token from Storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Logout User
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    // this.router.navigate(['/login']);
  }

  // Check if User is Authenticated
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
