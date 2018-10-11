import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { GridDataResult } from '@progress/kendo-angular-grid';

import { FeaturesService } from '../services/features.service';

@Injectable()
export class FeaturesResolver implements Resolve<GridDataResult> {

  constructor(private readonly featuresService: FeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GridDataResult> {
    return this.featuresService.index();
  }
}
