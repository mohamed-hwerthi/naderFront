import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GererTokenService {

  constructor(private router: Router) {}

  /// ajout token to localStorage
  stroreToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  /// retourner token de localStorage
  getToken() {
    return localStorage.getItem('token');
  }
  //// verifier si login active
  isLoggIn(): boolean {
    return !!localStorage.getItem('token');
  }
  /////// clear localStorage si signout
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
