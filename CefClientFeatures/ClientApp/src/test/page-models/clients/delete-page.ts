import { ComponentFixture } from '@angular/core/testing';

import { DeleteComponent } from '../../../app/clients/delete/delete.component';
import { QueryHelpers } from '../../query-helpers';

export class DeletePage {
    constructor(fixture: ComponentFixture<DeleteComponent>) {
        this.fixture = fixture;
    }

    fixture: ComponentFixture<DeleteComponent>;

    get elements() {
        return QueryHelpers.queryAll<HTMLElement>(this.fixture, 'dd');
    }
    get name() {
      let title = this.elements[0].textContent;
        if (typeof title === 'string') {
            title = title.trim();
        }
        return title;
    }
}
