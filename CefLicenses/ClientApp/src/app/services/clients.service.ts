import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseModelService } from './base-model.service';
import { Client } from '../models/client';

@Injectable()
export class ClientsService extends BaseModelService<Client> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly router: Router) {
    super('Clients', http, router);
  }
}
