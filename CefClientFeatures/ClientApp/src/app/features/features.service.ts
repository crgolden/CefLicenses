import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../app.service';
import { Feature } from '../models/feature';

@Injectable()
export class FeaturesService extends AppService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  index(): Observable<string | Feature[]> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<Feature[]>('/api/v1/Features/Index', options)
      .pipe(catchError(this.handleError));
  }

  details(id: string | null): Observable<string | Feature> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<Feature>(`/api/v1/Features/Details/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  create(feature: Feature): Observable<string | Feature> {
    const body = JSON.stringify(feature);
    const options = { headers: this.getHeaders() };

    return this.http
      .post<Feature>('/api/v1/Features/Create', body, options)
      .pipe(catchError(this.handleError));
  }

  edit(feature: Feature) {
    const body = JSON.stringify(feature);
    const options = { headers: this.getHeaders() };

    return this.http
      .put(`/api/v1/Features/Edit/${feature.id}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete(id: string | undefined) {
    const options = { headers: this.getHeaders() };

    return this.http
      .delete(`/api/v1/Features/Delete/${id}`, options)
      .pipe(catchError(this.handleError));
  }
}
