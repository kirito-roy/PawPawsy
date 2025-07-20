import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { Search } from './model/search';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.apiurl;

  constructor(private http: HttpClient, private router: Router) {}
  searchDATA(query: Search): Observable<any> {
    let params = new HttpParams();
    if (query) {
      params = params.set('data', query.data);
    }

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }
  searchedDATA(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/searched`,);
  }

}

