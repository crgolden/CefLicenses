import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from '../../../app/components/client-features/details/details.component';
import { QueryHelpers } from '../../query-helpers';

export class DetailsPage {

  fixture: ComponentFixture<DetailsComponent>;

  constructor(fixture: ComponentFixture<DetailsComponent>) {
    this.fixture = fixture;
  }

  get client() {
    let name = QueryHelpers.query<HTMLDivElement>(this.fixture, '#clientName').textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
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
