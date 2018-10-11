import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';

@Injectable()
export class ClientResolver implements Resolve<Client> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const id = route.paramMap.get('id');
    return this.clientsService.details(id);
  }
}
