import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map, catchError } from 'rxjs/operators/index';
import {
  toDataSourceRequestString,
  translateDataSourceResultGroups,
  DataSourceRequestState
} from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

import { BaseModel } from '../models/base-model';
import { AppService } from './app.service';

@Injectable()
export abstract class BaseModelService<T extends BaseModel> extends AppService {

  controllerName = '';
  defaultState = {
    skip: 0,
    take: 5
  } as DataSourceRequestState;

  protected constructor(controllerName: string, protected readonly http: HttpClient) {
    super();
    this.controllerName = controllerName;
  }

  index(state: DataSourceRequestState = this.defaultState): Observable<GridDataResult> {
    const options = { headers: this.getHeaders() };
    const queryStr = `${toDataSourceRequestString(state)}`;
    const hasGroups = state.group && state.group.length > 0;

    return this.http
      .get<any>(`/api/v1/${this.controllerName}/Index?${queryStr}`, options)
      .pipe(
        map((res: any) => ({
          data: hasGroups ? translateDataSourceResultGroups(res.Data) : res.Data,
          total: res.Total
        } as GridDataResult)),
        catchError<GridDataResult, never>(this.handleError));
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
      .put(`/api/v1/${this.controllerName}/Edit/${model.Id}`, body, options)
      .pipe(catchError<Object, never>(this.handleError));
  }

  delete(id: string): Observable<Object> {
    const options = { headers: this.getHeaders() };

    return this.http
      .delete(`/api/v1/${this.controllerName}/Delete/${id}`, options)
      .pipe(catchError<Object, never>(this.handleError));
  }

}
