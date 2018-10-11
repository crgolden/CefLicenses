import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/index';
import { map, catchError } from 'rxjs/operators/index';

import { AppService } from './app.service';

import { Login } from '../models/login';

@Injectable()
export class AccountService extends AppService {

  private returnUrl = '';

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute) {
    super();
    this.setReturnUrlFromQueryParams();
  }

  login(value: Login): Observable<boolean> {
    const body = JSON.stringify(value);
    const options = { headers: this.getHeaders() };

    return this.http
      .post<string>('/api/v1/Account/Login', body, options)
      .pipe(map(
        (res: string) => {
          this.setToken(res);
          this.setExpiration(new Date());
          this.isLoggedIn.emit(true);
          return true;
        }),
        catchError<boolean, never>(this.handleError));
  }

  logout(): void {
    this.removeToken();
    this.removeExpiration();
    this.isLoggedIn.emit(false);
  }

  hasToken(): boolean {
    const token = this.getToken();
    const expired = this.getExpiration().getTime() < Date.now();

    return (typeof token === 'string' && token.length > 0 && !expired);
  }

  getReturnUrl(): string {
    return this.returnUrl;
  }

  setReturnUrl(returnUrl: string): void {
    this.returnUrl = returnUrl;
  }

  private setReturnUrlFromQueryParams(): void {
    this.route.queryParams.subscribe((params: any) => {
      let returnUrl = params['returnUrl'];
      if (typeof returnUrl === 'undefined') {
        returnUrl = params['ReturnUrl'];
      }
      if (typeof returnUrl === 'string') {
        this.returnUrl = returnUrl;
      }
    });
  }

  private getExpiration(): Date {
    const expiration = new Date();
    if (typeof window !== 'undefined') {
      const expirationString = localStorage.getItem('expiration');
      let expirationNumber = 0;
      if (expirationString != null) {
        expirationNumber = parseFloat(expirationString);
      }
      if (expirationNumber > 0) {
        expiration.setTime(expirationNumber);
      }
    }
    return expiration;
  }

  private setExpiration(time: Date): void {
    if (typeof window !== 'undefined') {
      const expiration = time.getTime() + 30 * 60000;
      localStorage.setItem('expiration', JSON.stringify(expiration));
    }
  }

  private removeExpiration(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('expiration');
    }
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

}
