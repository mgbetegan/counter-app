import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';

import {ENVIRONMENT} from './tokens/environnement';
import {environment} from '@environments/environment';
import {PPTheme} from '../theme';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpErrorInterceptor} from '@app/interceptors/httpErrorInterceptor';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,

    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: PPTheme,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
      ripple: true,
    }),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]),
    )
  ]
};
