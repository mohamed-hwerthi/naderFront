import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from '../models/contrat.model';

@Injectable({
  providedIn: 'root',
})
export class ContratService {
  private baseUrl = 'http://localhost:8080/api/contrats';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les contrats par statut
  getContratsByStatus(status: string): Observable<Contrat[]> {
    const url = `${this.baseUrl}/status/${status}`;
    return this.http.get<Contrat[]>(url);
  }

  // Méthode pour obtenir tous les contrats
  getAllContrats(): Observable<Contrat[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Contrat[]>(url);
  }

  // Méthode pour mettre à jour un contrat existant
  updateContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(
      `${this.baseUrl}/updateC/${contrat.codeContrat}`,
      contrat
    );
  }

  deleteContrat(codeContrat: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${codeContrat}`);
  }
}
