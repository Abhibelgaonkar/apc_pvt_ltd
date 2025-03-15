import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginModel } from '../models/login-model';
import { map, Observable } from 'rxjs';
import { AuthResponseModel } from '../models/auth-response-model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey: string = "TheAdityaPropertiesCorpSecureKeyapcKolhapur";
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  login(vm: LoginModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.apiUrl}account/login`, vm)
      .pipe(
        map((res) => {
          if (res.token != undefined) {
            localStorage.setItem(this.tokenKey, res.token);
          }
          return res;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean{
    const token = this.retriveToken();
    if(token == null){
      return false;
    }

    return this.isTokenValid(token);
  }

  private retriveToken(): string | null {
    return localStorage.getItem(this.tokenKey) || null;
  }

  private isTokenValid(token: string): boolean{
    if(token == null) return false;

    const decodedToken = jwtDecode(token);

    if(Date.now() > decodedToken['exp']! * 1000){
      this.logout();
      return false;
    }

    return true;
  }
}
