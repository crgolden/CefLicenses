import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { ClientFeaturesService } from '../services/client-features.service';
import { ClientFeature } from '../relationships/client-feature';

@Injectable()
export class ClientFeatureResolver implements Resolve<ClientFeature> {

  constructor(private readonly clientFeaturesService: ClientFeaturesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ClientFeature> {
    const id1 = route.paramMap.get('id1');
    const id2 = route.paramMap.get('id2');
    return this.clientFeaturesService.details(id1, id2);
  }
}
