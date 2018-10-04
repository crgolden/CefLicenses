import { ComponentFixture } from '@angular/core/testing';

import { IndexComponent } from '../../../app/clients/index/index.component';
import { QueryHelpers } from '../../query-helpers';

export class IndexPage {
  constructor(fixture: ComponentFixture<IndexComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<IndexComponent>;

  get rows() {
    return QueryHelpers.queryAll<HTMLElement>(this.fixture, 'tr');
  }
}
