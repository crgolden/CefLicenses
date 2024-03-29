import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

export abstract class BaseModelService<T extends BaseModel> extends AppService {

  controllerName: string;

  protected constructor(
    controllerName: string,
    protected readonly http: HttpClient,
    protected readonly router: Router) {
    super(router);
    this.controllerName = controllerName;
  }

  index(state: DataSourceRequestState): Observable<GridDataResult> {
    const hasGroups = state.group && state.group.length > 0;
    const queryStr = `${toDataSourceRequestString(state)}`;

    return this.http
      .get<GridDataResult>(`/api/v1/${this.controllerName}/Index?${queryStr}`)
      .pipe(
        map((res: GridDataResult) => ({
          data: hasGroups ? translateDataSourceResultGroups(res.data) : res.data,
          total: res.total
        })),
        catchError<GridDataResult, never>(this.handleError));
  }

  details(id: string): Observable<T> {
    return this.http
      .get<T>(`/api/v1/${this.controllerName}/Details/${id}`)
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
