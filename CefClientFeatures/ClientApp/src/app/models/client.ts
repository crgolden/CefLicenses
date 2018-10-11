import { BaseModel } from './base-model';
import { ClientFeature } from './client-feature';

export class Client extends BaseModel {
  ClientFeatures?: Array<ClientFeature>;
}
