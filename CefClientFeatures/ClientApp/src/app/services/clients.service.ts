import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseModelService } from './base-model.service';
import { Client } from '../models/client';

@Injectable()
export class ClientsService extends BaseModelService<Client> {

  constructor(protected readonly http: HttpClient) {
    super('Clients', http);
  }

}
