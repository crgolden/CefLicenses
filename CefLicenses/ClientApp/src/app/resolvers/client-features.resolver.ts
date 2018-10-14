import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { ClientFeaturesService } from '../services/client-features.service';

@Injectable()
export class ClientFeaturesResolver implements Resolve<GridDataResult> {

  constructor(private readonly clientFeaturesService: ClientFeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GridDataResult> {
    const state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'Model1Name',
          dir: 'asc'
        },
        {
          field: 'Model2Name',
          dir: 'asc'
        }
      ] as SortDescriptor[]
    } as DataSourceRequestState;
    return this.clientFeaturesService.index(state);
  }
}
