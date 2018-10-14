import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from '../../../app/components/features/details/details.component';
import { QueryHelpers } from '../../query-helpers';

export class DetailsPage {
  constructor(fixture: ComponentFixture<DetailsComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<DetailsComponent>;

  get elements() {
    return QueryHelpers.queryAll<HTMLElement>(this.fixture, 'dd');
  }
  get name() {
    let name = this.elements[0].textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
}
