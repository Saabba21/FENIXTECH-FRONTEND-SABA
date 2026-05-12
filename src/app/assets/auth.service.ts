import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Definimos la estructura exacta que nos envía el backend
export interface AuthResponse {
  email: string;
  role: string;
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'admin_auth_token';
  private readonly USER_ID_KEY = 'admin_user_id';
  private readonly ROLE_KEY = 'admin_role';
  private readonly EMAIL_KEY = 'admin_email';
  private readonly API_URL = 'http://localhost/fenixtech/api/v1';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, { email, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
          localStorage.setItem(this.USER_ID_KEY, response.userId.toString());
          localStorage.setItem(this.ROLE_KEY, response.role);
          localStorage.setItem(this.EMAIL_KEY, response.email); // Ahora también guardamos el email
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}