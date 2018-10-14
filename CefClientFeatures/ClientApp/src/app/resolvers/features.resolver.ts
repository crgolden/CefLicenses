import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { FeaturesService } from '../services/features.service';

@Injectable()
export class FeaturesResolver implements Resolve<GridDataResult> {

  constructor(private readonly featuresService: FeaturesService) {
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
    return this.featuresService.index(state);
  }
}
