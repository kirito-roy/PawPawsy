import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
// Removed incorrect import of 'json' from 'body-parser'

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = environment.apiurl;
  payload = {
    id: 1,
  };
  // sonify the payload
  // payload = JSON.stringify({
  //   "id": 1,
  //   "name": "John Doe",

  constructor(private http: HttpClient, private router: Router) {}
  testDATA(): Observable<any> {


    return this.http.get<any>(`${this.apiUrl}`,);
  }
}
