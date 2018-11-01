import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from '../../../app/components/clients/details/details.component';
import { QueryHelpers } from '../../query-helpers';

export class DetailsPage {

  fixture: ComponentFixture<DetailsComponent>;

  constructor(fixture: ComponentFixture<DetailsComponent>) {
    this.fixture = fixture;
  }

  get name() {
    let name = QueryHelpers.query<HTMLDivElement>(this.fixture, '#clientName').textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
}
