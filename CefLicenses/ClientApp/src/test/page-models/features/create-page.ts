import { ComponentFixture } from '@angular/core/testing';
import { CreateComponent } from '../../../app/components/features/create/create.component';
import { QueryHelpers } from '../../query-helpers';

export class CreatePage {
    constructor(fixture: ComponentFixture<CreateComponent>) {
        this.fixture = fixture;
    }

    fixture: ComponentFixture<CreateComponent>;

    get inputs() {
        return QueryHelpers.queryAll<HTMLInputElement>(this.fixture, 'input');
    }
    get name() {
        return this.inputs[0];
    }
}
