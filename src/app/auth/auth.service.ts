import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) {}

  /**
   * Vérifie si le code est exécuté dans un environnement navigateur
   */
  private isBrowserEnvironment(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  /**
   * Stocke un élément dans le sessionStorage
   */
  setSessionStorage(key: string, value: string): void {
    if (this.isBrowserEnvironment()) {
      sessionStorage.setItem(key, value);
    }
  }

  /**
   * Récupère un élément depuis le sessionStorage
   */
  getSessionStorage(key: string): string | null {
    if (this.isBrowserEnvironment()) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  /**
   * Vide tout le sessionStorage
   */
  clearSessionStorage(): void {
    if (this.isBrowserEnvironment()) {
      sessionStorage.clear();
    }
  }

  /**
   * Récupère le token d'accès depuis le sessionStorage
   */
  getAuthToken(): string | null {
    return this.getSessionStorage(this.TOKEN_KEY);
  }

  /**
   * Enregistre le token d'accès
   */
  saveToken(accessToken: string): void {
    console.log("Enregistrament ", accessToken);
    this.setSessionStorage(this.TOKEN_KEY, accessToken);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Supprime le token et déconnecte l'utilisateur
   */
  logout(): void {
    this.clearSessionStorage();
    this.isLoggedInSubject.next(false);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && !this.isAccessTokenExpired();
  }

  /**
   * Vérifie si le token d'accès est expiré
   */
  isAccessTokenExpired(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return true;
    }

    try {
      // Décodage du token pour vérifier l'expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      console.error('Invalid token format', e);
      return true;
    }
  }

  /**
   * Connecte l'utilisateur
   */
  login(username: string, password: string): Observable<void> {
    // Remplacez l'URL par celle de votre API
    const url = 'http://localhost:8080/api/v1/auth/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(
      url,
      { username, password },
      { headers }
    ).pipe(
      map(response => {
        console.log(response);
        this.isLoggedInSubject.next(true);
        this.saveToken(response['access-token']);
      })
    );
  }

  /**
   * Émet un observable pour suivre l'état de connexion
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
