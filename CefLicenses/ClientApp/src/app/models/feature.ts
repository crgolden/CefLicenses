import { BaseModel } from './base-model';
import { ClientFeature } from '../relationships/client-feature';

export class Feature extends BaseModel {
  isCore: boolean;
  clientFeatures: Array<ClientFeature>;
}
