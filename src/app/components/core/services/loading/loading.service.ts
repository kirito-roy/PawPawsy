import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable to track loading status
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  // Show loading
  show(): void {
    this.loadingSubject.next(true);
  }

  // Hide loading
  hide(): void {
    this.loadingSubject.next(false);
  }
}
