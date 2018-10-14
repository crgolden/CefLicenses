import { BaseModel } from './base-model';
import { ClientFeature } from '../relationships/client-feature';

export class Feature extends BaseModel {
  IsCore: boolean;
  ClientFeatures: Array<ClientFeature>;
}
