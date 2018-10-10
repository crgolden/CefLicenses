import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';

@Injectable()
export class ClientsResolver implements Resolve<Array<Client>> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<Client>> {
    return this.clientsService.index();
  }
}
