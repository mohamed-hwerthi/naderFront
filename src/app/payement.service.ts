import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementService {

  private apiUrl = '/api/payments/charge'; // Assurez-vous que ce chemin correspond à votre API Spring Boot

  constructor(private http: HttpClient) { }

  charge(token: string, amount: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { token, amount });
  }
}
