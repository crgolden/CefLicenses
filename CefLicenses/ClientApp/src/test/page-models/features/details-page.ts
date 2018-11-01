import { ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from '../../../app/components/features/details/details.component';
import { QueryHelpers } from '../../query-helpers';

export class DetailsPage {

  fixture: ComponentFixture<DetailsComponent>;

  constructor(fixture: ComponentFixture<DetailsComponent>) {
    this.fixture = fixture;
  }

  get name() {
    let name = QueryHelpers.query<HTMLDivElement>(this.fixture, '#featureName').textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
  get isCore() {
    let isCore = QueryHelpers.query<HTMLDivElement>(this.fixture, '#featureIsCore').textContent;
    if (typeof isCore === 'string') {
      isCore = isCore.trim();
    }
    return isCore;
  }
}
