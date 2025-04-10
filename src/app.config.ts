import {
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './app/components/core/services/interceptors/auth.interceptor';
import { LoadingService } from './app/components/core/services/loading/loading.service';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide router with initial navigation and scroll settings
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDlqLc2Fq-tp_LIy1h5k0VXnl_wiBnUKY0',
        authDomain: 'pawpawsy.firebaseapp.com',
        projectId: 'pawpawsy',
        storageBucket: 'pawpawsy.firebasestorage.app',
        messagingSenderId: '153275426304',
        appId: '1:153275426304:web:d423fd9e8e211b28b71ae5',
        measurementId: 'G-P807ZK4TF7',
      }),
    ),
    provideAuth(() => getAuth()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

    // Provide HTTP client with fetch and DI-based interceptors
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    // Provide animations asynchronously
    provideAnimationsAsync(),

    // Provide PrimeNG with Aura theme
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
    LoadingService,
    MessageService,

  ],
};
