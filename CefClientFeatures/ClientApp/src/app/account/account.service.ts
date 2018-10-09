import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppService } from '../app.service';

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

  login(value: Login): Observable<string | boolean> {
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
        catchError(() => throwError(new Error('Invalid username or password'))));
  }

  logout(): void {
    this.removeToken();
    this.removeExpiration();
    this.isLoggedIn.emit(false);
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

  setReturnUrl(returnUrl: string) {
    this.returnUrl = returnUrl;
  }

  getReturnUrl(): string {
    return this.returnUrl;
  }
}
