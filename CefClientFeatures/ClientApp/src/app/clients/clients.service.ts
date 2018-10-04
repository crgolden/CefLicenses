import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from '../app.service';
import { Client } from '../models/client';

@Injectable()
export class ClientsService extends AppService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  index(): Observable<string | Client[]> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<Client[]>('/api/v1/Clients/Index', options)
      .pipe(catchError(this.handleError));
  }

  details(id: string | null): Observable<string | Client> {
    const options = { headers: this.getHeaders() };

    return this.http
      .get<Client>(`/api/v1/Clients/Details/${id}`, options)
      .pipe(catchError(this.handleError));
  }

  create(client: Client): Observable<string | Client> {
    const body = JSON.stringify(client);
    const options = { headers: this.getHeaders() };

    return this.http
      .post<Client>('/api/v1/Clients/Create', body, options)
      .pipe(catchError(this.handleError));
  }

  edit(client: Client): Observable<string | Client> {
    const body = JSON.stringify(client);
    const options = { headers: this.getHeaders() };

    return this.http
      .put(`/api/v1/Clients/Edit/${client.id}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete(id: string | undefined) {
    const options = { headers: this.getHeaders() };

    return this.http
      .delete(`/api/v1/Clients/Delete/${id}`, options)
      .pipe(catchError(this.handleError));
  }
}
