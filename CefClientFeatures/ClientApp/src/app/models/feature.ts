import { ClientFeature } from './clientFeature';

export class Feature {
  id?: string;
  name?: string;
  isCore?: boolean;
  clientFeatures?: Array<ClientFeature>;
}
