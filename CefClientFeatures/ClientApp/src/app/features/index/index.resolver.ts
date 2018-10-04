import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { FeaturesService } from '../features.service';
import { Feature } from '../../models/feature';

@Injectable()
export class IndexResolver implements Resolve<string | Feature[]> {

  constructor(private readonly featuresService: FeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.featuresService.index();
  }
}