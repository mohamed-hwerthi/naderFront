import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GererTokenService } from '../services/gerer-token.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: GererTokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${myToken}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Session expirée, veuillez vous reconnecter.');
            this.router.navigate(['login']);
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
