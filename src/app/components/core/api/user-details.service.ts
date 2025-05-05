import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDetailsUpdate } from './model/user-details-update';
// Removed incorrect import of 'json' from 'body-parser'
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'https://petbackend.roy184433.workers.dev/api/user';


  constructor(private http: HttpClient) { }
  getUserDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Details`);
  }

  updateUserDetails(data: UserDetailsUpdate): Observable<any> {
    const stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);
    return this.http.post<any>(`${this.apiUrl}/updateDatails`, stringifiedData);
  }

}
