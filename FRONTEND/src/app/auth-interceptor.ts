import { HttpInterceptorFn } from '@angular/common/http';
import { catchError,throwError,switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './services/user-service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && error.error?.message === 'Token expired!' ) {
        return userService.getRefreshToken().pipe(
          switchMap(() => next(req)),
          catchError(() => {
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
