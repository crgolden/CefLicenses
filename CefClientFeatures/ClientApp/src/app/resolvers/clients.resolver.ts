import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';

import { ClientsService } from '../services/clients.service';

@Injectable()
export class ClientsResolver implements Resolve<GridDataResult> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GridDataResult> {
    return this.clientsService.index();
  }
}
