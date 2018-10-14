import { ComponentFixture } from '@angular/core/testing';
import { CreateComponent } from '../../../app/components/client-features/create/create.component';
import { QueryHelpers } from '../../query-helpers';

export class CreatePage {
  constructor(fixture: ComponentFixture<CreateComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<CreateComponent>;

  get inputs() {
    return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
  }
  get client() {
    return this.inputs[0];
  }
  get feature() {
    return this.inputs[1];
  }
  get expirationDate() {
    return this.inputs[2];
  }
}
