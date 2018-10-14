import { BaseModel } from './base-model';
import { ClientFeature } from '../relationships/client-feature';

export class Client extends BaseModel {
  ClientFeatures: Array<ClientFeature>;
}
