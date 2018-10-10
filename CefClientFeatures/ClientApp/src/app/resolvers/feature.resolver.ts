import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';

import { FeaturesService } from '../services/features.service';
import { Feature } from '../models/feature';

@Injectable()
export class FeatureResolver implements Resolve<Feature> {

  constructor(private readonly featuresService: FeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Feature> {
    const id = route.paramMap.get('id');
    return this.featuresService.details(id);
  }
}
