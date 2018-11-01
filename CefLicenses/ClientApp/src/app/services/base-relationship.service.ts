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
import { BaseRelationship } from '../relationships/base-relationship';
import { AppService } from './app.service';

export abstract class BaseRelationshipService<T extends BaseRelationship> extends AppService {

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
      .get<any>(`/api/v1/${this.controllerName}/Index?${queryStr}`)
      .pipe(
        map((res: GridDataResult) => ({
          data: hasGroups ? translateDataSourceResultGroups(res.data) : res.data,
          total: res.total
        })),
        catchError<GridDataResult, never>(this.handleError));
  }

  details(id1: string, id2: string): Observable<T> {
    return this.http
      .get<T>(`/api/v1/${this.controllerName}/Details/${id1}/${id2}`)
      .pipe(catchError<T, never>(this.handleError));
  }

  create(relationship: T): Observable<T> {
    const body = JSON.stringify(relationship);
    const options = { headers: this.getHeaders() };

    return this.http
      .post<T>(`/api/v1/${this.controllerName}/Create`, body, options)
      .pipe(catchError<T, never>(this.handleError));
  }

  edit(relationship: T): Observable<Object> {
    const body = JSON.stringify(relationship);
    const options = { headers: this.getHeaders() };

    return this.http
      .put(`/api/v1/${this.controllerName}/Edit/${relationship.model1Id}/${relationship.model2Id}`, body, options)
      .pipe(catchError<Object, never>(this.handleError));
  }

  delete(id1: string, id2: string): Observable<Object> {
    const options = { headers: this.getHeaders() };

    return this.http
      .delete(`/api/v1/${this.controllerName}/Delete/${id1}/${id2}`, options)
      .pipe(catchError<Object, never>(this.handleError));
  }
}
