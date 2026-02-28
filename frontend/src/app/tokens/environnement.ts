import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  apiTimeout: number;
  enableDevTools: boolean;
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment.config');
