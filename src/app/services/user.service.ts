import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8092/auth1/login';
  constructor(private http: HttpClient) {}
/// correct object
  postPaiement(user: object): Observable<object> {
    return this.http.post<object>(this.baseUrl, user).pipe(
      catchError((error) => {
        return throwError('erreur se produite lors de l`envoie de donnees');
      })
    );
  }

}
