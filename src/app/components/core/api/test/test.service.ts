import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
// Removed incorrect import of 'json' from 'body-parser'

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'https://petbackend.roy184433.workers.dev/api';
  payload = {
    id: 1,
  };
  // sonify the payload
  // payload = JSON.stringify({
  //   "id": 1,
  //   "name": "John Doe",

  constructor(private http: HttpClient, private router: Router) {}
  testDATA(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/hello`,);
  }
}
