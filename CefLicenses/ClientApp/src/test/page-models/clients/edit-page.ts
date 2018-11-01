import { ComponentFixture } from '@angular/core/testing';
import { EditComponent } from '../../../app/components/clients/edit/edit.component';
import { QueryHelpers } from '../../query-helpers';

export class EditPage {

  fixture: ComponentFixture<EditComponent>;

  constructor(fixture: ComponentFixture<EditComponent>) {
    this.fixture = fixture;
  }

  get inputs() {
    return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
  }
  get name() {
    return this.inputs[0];
  }
}
