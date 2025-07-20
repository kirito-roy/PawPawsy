import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { Search } from './model/search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataEntryService {
  private apiUrl = environment.apiurl;

  constructor(private http: HttpClient, private router: Router) { }
  SentData(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/dataentry`, credentials);
    
  }
  GetData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/getProducts`);
  }
}
