import {Injectable} from '@angular/core';
import {Login} from "../../models/interfaces/login";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseUrl} from "../../models/constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }


  login(login: Login) {
    let params = new HttpParams();
    return this.http.post(BaseUrl + 'login', login);
  }


  roleMatch(allowedRoles: any[]): boolean {
    let payLoad = this.getPayload();
    let userRoles = payLoad.role as Array<string>;
    let isMatch = false;
    allowedRoles.forEach((element) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  logout(): void {
    // this.http.get(BaseUrl + 'logout').subscribe()
    this.removeToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (token) {
      const tokenExpirationDate = this.getTokenExpirationDate(token);
      if (tokenExpirationDate && tokenExpirationDate > new Date())
        return true;
      this.removeToken();
    }
    return false;
  }

  getPayload() {
    return JSON.parse(
      atob(this.getToken().split('.')[1])
    );
  }

  setToken(token: string): void {
    localStorage.setItem('cm_token', token);
  }

  removeToken(): void {
    localStorage.removeItem('cm_token');
  }

  getToken(): string {
    return localStorage.getItem('cm_token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const tokenExpirationDate = this.getTokenExpirationDate(token);
    if (!tokenExpirationDate) return true;
    return tokenExpirationDate < new Date();
  }

  // Parse the JWT token to get its expiration date
  private getTokenExpirationDate(token: string): Date | null {
    try {
      const jwtPayload = this.getPayload();
      if (jwtPayload && jwtPayload.exp) {
        return new Date(jwtPayload.exp * 1000);
      }
    } catch (e) {
    }
    return null;
  }

}
