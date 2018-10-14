import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseRelationshipService } from './base-relationship.service';
import { ClientFeature } from '../relationships/client-feature';

@Injectable()
export class ClientFeaturesService extends BaseRelationshipService<ClientFeature> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly router: Router) {
    super('ClientFeatures', http, router);
  }
}
