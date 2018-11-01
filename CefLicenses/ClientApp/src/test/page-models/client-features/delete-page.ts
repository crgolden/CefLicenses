import { ComponentFixture } from '@angular/core/testing';
import { DeleteComponent } from '../../../app/components/client-features/delete/delete.component';
import { QueryHelpers } from '../../query-helpers';

export class DeletePage {

  fixture: ComponentFixture<DeleteComponent>;

  constructor(fixture: ComponentFixture<DeleteComponent>) {
    this.fixture = fixture;
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
    let expirationDate = QueryHelpers.query<HTMLDivElement>(this.fixture, '#expirationDate').textContent;
    if (typeof expirationDate === 'string') {
      expirationDate = expirationDate.trim();
    }
    return expirationDate;
  }
}
