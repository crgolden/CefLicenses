import { ComponentFixture } from '@angular/core/testing';
import { EditComponent } from '../../../app/components/features/edit/edit.component';
import { QueryHelpers } from '../../query-helpers';

export class EditPage {
  constructor(fixture: ComponentFixture<EditComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<EditComponent>;

  get inputs() {
    return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
  }
  get name() {
    return this.inputs[0];
  }
}
