import { ComponentFixture } from '@angular/core/testing';
import { DeleteComponent } from '../../../app/components/clients/delete/delete.component';
import { QueryHelpers } from '../../query-helpers';

export class DeletePage {

  fixture: ComponentFixture<DeleteComponent>;

  constructor(fixture: ComponentFixture<DeleteComponent>) {
    this.fixture = fixture;
  }

  get name() {
    let name = QueryHelpers.query<HTMLDivElement>(this.fixture, '#clientName').textContent;
    if (typeof name === 'string') {
      name = name.trim();
    }
    return name;
  }
}
