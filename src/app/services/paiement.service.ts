import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Paiement } from '../models/Paiement.model';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private baseUrl = 'http://localhost:8092/api/payments/process';
  constructor(private http: HttpClient) {}

  postPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.baseUrl, paiement).pipe(
      catchError((error) => {
        return throwError('erreur se produite lors de l`envoie de donnees');
      })
    );
  }


  
}
