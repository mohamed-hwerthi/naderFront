import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel } from '../clientModel';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getClientByNum(num: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/clients/${num}`);
  }

  updateContrat(contrat: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/contrats/${contrat.codeContrat}`,
      contrat
    );
  }

  deleteContrat(codeContrat: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contrats/${codeContrat}`);
  }

  getClient(clientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clientId}`);
  }

  updateClient(clientId: number, updates: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${clientId}`, updates);
  }

  getAllClient(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.baseUrl}/clients`);
  }
}
