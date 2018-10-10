import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

import { FeaturesService } from '../services/features.service';
import { Feature } from '../models/feature';

@Injectable()
export class FeaturesResolver implements Resolve<Array<Feature>> {

  constructor(private readonly featuresService: FeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Array<Feature>> {
    return this.featuresService.index();
  }
}
