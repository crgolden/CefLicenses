import { ComponentFixture } from '@angular/core/testing';
import { DeleteComponent } from '../../../app/components/features/delete/delete.component';
import { QueryHelpers } from '../../query-helpers';

export class DeletePage {

  fixture: ComponentFixture<DeleteComponent>;

  constructor(fixture: ComponentFixture<DeleteComponent>) {
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
