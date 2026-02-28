import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';

import {ENVIRONMENT} from './tokens/environnement';
import {environment} from '@environments/environment';
import {PPTheme} from '../theme';

export const appConfig: ApplicationConfig = {
  providers: [
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
    })
  ]
};
