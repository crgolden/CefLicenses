import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ClientsService } from '../clients.service';
import { Client } from '../../models/client';

@Injectable()
export class IndexResolver implements Resolve<string | Client[]> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.index();
  }
}
