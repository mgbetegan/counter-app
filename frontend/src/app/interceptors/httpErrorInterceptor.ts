import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = null;
        switch (error.status) {
          case 500:
            errorMessage = 'Internal Server Error';
            break;
          default:
            errorMessage = `Unknown Error occurred`;
        }

        messageService.add({severity: 'error', summary: 'Info',detail: errorMessage});

      return throwError(() => error);
    })
  );
};
