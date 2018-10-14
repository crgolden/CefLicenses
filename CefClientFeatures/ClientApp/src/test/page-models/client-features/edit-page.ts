import { ComponentFixture } from '@angular/core/testing';
import { EditComponent } from '../../../app/components/client-features/edit/edit.component';
import { QueryHelpers } from '../../query-helpers';

export class EditPage {
  constructor(fixture: ComponentFixture<EditComponent>) {
    this.fixture = fixture;
  }

  fixture: ComponentFixture<EditComponent>;

  get inputs() {
    return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
  }
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
    return this.inputs[0];
  }
}
