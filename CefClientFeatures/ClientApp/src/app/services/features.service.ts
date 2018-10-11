import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseModelService } from './base-model.service';
import { Feature } from '../models/feature';

@Injectable()
export class FeaturesService extends BaseModelService<Feature> {

  constructor(protected readonly http: HttpClient) {
    super('Features', http);
  }

}
