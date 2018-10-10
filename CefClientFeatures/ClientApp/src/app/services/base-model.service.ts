import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { catchError } from 'rxjs/operators/index';

import { BaseModel } from '../models/base-model';
import { AppService } from './app.service';

@Injectable()
export class BaseModelService<T extends BaseModel> extends AppService {

  controllerName = '';

  constructor(controllerName: string, protected readonly http: HttpClient) {
    super();
    this.controllerName = controllerName;
  }

  index(): Observable<Array<T>> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<T[]>(`/api/v1/${this.controllerName}/Index`, options)
      .pipe(catchError<Array<T>, never>(this.handleError));
  }

  details(id: string): Observable<T> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<T>(`/api/v1/${this.controllerName}/Details/${id}`, options)
      .pipe(catchError<T, never>(this.handleError));
  }

  create(model: T): Observable<T> {
    const body = JSON.stringify(model);
    const options = { headers: this.getHeaders() };

    return this.http
      .post<T>(`/api/v1/${this.controllerName}/Create`, body, options)
      .pipe(catchError<T, never>(this.handleError));
  }

  edit(model: T): Observable<Object> {
    const body = JSON.stringify(model);
    const options = { headers: this.getHeaders() };

    return this.http
      .put(`/api/v1/${this.controllerName}/Edit/${model.id}`, body, options)
      .pipe(catchError<Object, never>(this.handleError));
  }

  delete(id: string): Observable<Object> {
    const options = { headers: this.getHeaders() };

    return this.http
      .delete(`/api/v1/${this.controllerName}/Delete/${id}`, options)
      .pipe(catchError<Object, never>(this.handleError));
  }

}
