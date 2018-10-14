import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from '../../../app/components/client-features/details/details.component';
import { QueryHelpers } from '../../query-helpers';

export class DetailsPage {
  constructor(fixture: ComponentFixture<DetailsComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<DetailsComponent>;

  get elements() {
    return QueryHelpers.queryAll<HTMLElement>(this.fixture, 'dd');
  }
  get client() {
    let name = this.elements[0].textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
  get feature() {
    let name = this.elements[1].textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
  get expirationDate() {
    let name = this.elements[2].textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
}
