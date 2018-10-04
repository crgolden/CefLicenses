import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ClientsService } from '../clients.service';
import { Client } from '../../models/client';

@Injectable()
export class DetailsResolver implements Resolve<string | Client> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.details(route.paramMap.get('id'));
  }
}
