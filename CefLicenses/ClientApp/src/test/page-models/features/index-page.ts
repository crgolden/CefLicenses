import { ComponentFixture } from '@angular/core/testing';
import { IndexComponent } from '../../../app/components/features/index/index.component';
import { QueryHelpers } from '../../query-helpers';

export class IndexPage {

  fixture: ComponentFixture<IndexComponent>;

  constructor(fixture: ComponentFixture<IndexComponent>) {
    this.fixture = fixture;
  }

  get rows() {
    return QueryHelpers.queryAll<HTMLElement>(this.fixture, 'tr');
  }
}
