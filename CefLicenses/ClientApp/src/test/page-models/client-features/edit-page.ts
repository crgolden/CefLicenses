import { ComponentFixture } from '@angular/core/testing';
import { EditComponent } from '../../../app/components/client-features/edit/edit.component';
import { QueryHelpers } from '../../query-helpers';

export class EditPage {

  fixture: ComponentFixture<EditComponent>;

  constructor(fixture: ComponentFixture<EditComponent>) {
    this.fixture = fixture;
  }

  get inputs() {
    return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
  }
  get client() {
    let client = QueryHelpers.query<HTMLDivElement>(this.fixture, '#clientName').textContent;
    if (typeof client === 'string') {
      client = client.trim();
    }
    return client;
  }
  get feature() {
    let feature = QueryHelpers.query<HTMLDivElement>(this.fixture, '#featureName').textContent;
    if (typeof feature === 'string') {
      feature = feature.trim();
    }
    return feature;
  }
  get expirationDate() {
    return this.inputs[0];
  }
}
