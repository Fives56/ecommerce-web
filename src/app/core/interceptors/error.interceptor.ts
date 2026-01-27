import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

/**
 * Interceptor to handle errors
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      let message = 'Something went wrong';

      if (error.status === 401) {
        message = 'Please login again';
      } else if (error.status === 404) {
        message = 'Resource not found';
      } else if (error.status === 500) {
        message = 'Server error';
      } else if (error.status === 0) {
        message = 'Connection error';
      }

      toastService.error(message);
      
      return throwError(() => error);
    })
  );
};