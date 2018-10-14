import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs/index';

@Injectable()
export abstract class AppService {

  @Output() isLoggedIn = new EventEmitter<boolean>();

  protected constructor(protected readonly router: Router) {
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      switch (error.status) {
        case 401:
          this.router.navigate([`/Account/Login`]);
          break;
        default:
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
      }
    }
    return throwError('Something bad happened; please try again later.');
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  protected getToken(): string {
    let token = '';
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return token;
  }
}
