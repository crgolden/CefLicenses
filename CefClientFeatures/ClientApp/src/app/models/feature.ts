import { BaseModel } from './base-model';
import { ClientFeature } from './client-feature';

export class Feature extends BaseModel {
  IsCore?: boolean;
  ClientFeatures?: Array<ClientFeature>;
}
