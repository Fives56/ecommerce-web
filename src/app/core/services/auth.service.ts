import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _toastService = inject(ToastService);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  /**
   * Login a user
   * @param username Username
   * @param password Password
   * @returns Observable of AuthResponse
   */
  login(username: string, password: string): Observable<any> {
    return this._http.post<string>(environment.apiUrl + 'auth/login', { username, password })
      .pipe(catchError(() => {
        this._toastService.error('Invalid username or password');
        return of(null)
      }));
  }

  /**
   * Get the token from local storage
   * @returns Token string or null if not logged in
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get the user from local storage
   * @returns User object or null if not logged in
   */
  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if the user is logged in
   * @returns True if logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Set the token and user in local storage
   * @param token Token string
   * @param user User object
   */
  setLocalStorage(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear the token and user from local storage
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}