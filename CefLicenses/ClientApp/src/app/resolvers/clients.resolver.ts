import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { ClientsService } from '../services/clients.service';

@Injectable()
export class ClientsResolver implements Resolve<GridDataResult> {

  constructor(private readonly clientsService: ClientsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GridDataResult> {
    const state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'Name',
          dir: 'asc'
        }
      ] as SortDescriptor[]
    } as DataSourceRequestState;
    return this.clientsService.index(state);
  }
}
