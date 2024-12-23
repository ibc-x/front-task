import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAuthToken();

    // Ajouter le token à l'en-tête Authorization si disponible
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError(error => {
        // Si l'erreur est un 401 (Unauthorized), rediriger vers la page de connexion
        if (error.status === 401) {
          this.authService.logout(); // Supprime le token
          this.router.navigate(['/login']); // Redirige vers la page de connexion
        }
        throw error; // Relancer l'erreur
      })
    );
  }
}
