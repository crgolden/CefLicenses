import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { IndexPage } from '../../../test/page-models/clients/index-page';
import { IndexComponent } from './index.component';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';

const client1: Client = {
  Id: '1',
  Name: 'Client 1'
};
const client2: Client = {
  Id: '2',
  Name: 'Client 2'
};
const clients = {
  data: [client1, client2],
  total: 2
} as GridDataResult;
let component: IndexComponent;
let fixture: ComponentFixture<IndexComponent>;
let page: IndexPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('IndexComponent', () => {

  beforeEach(() => setup());

  it('should have the clients', () => {
    expect(component.clients.total).toBe(2);
  });

  it('should display clients', () => {
    const clientRow1 = page.rows[2];
    const clientRow2 = page.rows[3];
    let clientRow1Name = clientRow1.children[0].textContent;
    let clientRow2Name = clientRow2.children[0].textContent;

    if (clientRow1Name != null) {
      clientRow1Name = clientRow1Name.trim();
    } else {
      clientRow1Name = '';
    }
    if (clientRow2Name != null) {
      clientRow2Name = clientRow2Name.trim();
    } else {
      clientRow2Name = '';
    }

    expect(clientRow1Name).toBe(client1.Name);
    expect(clientRow2Name).toBe(client2.Name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/Clients/Create');
    expect(routerLinks[1].linkParams).toBe(`/Clients/Details/${client1.Id}`);
    expect(routerLinks[2].linkParams).toBe(`/Clients/Details/${client2.Id}`);
  });

  it('can click Clients/Create link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe('/Clients/Create');
  });

  it('can click Clients/Details/:clients[0].id link in template', () => {
    const client1LinkDebugElement = routerLinkDebugElements[1];
    const client1Link = routerLinks[1];

    expect(client1Link.navigatedTo).toBeNull('should not have navigated yet');

    client1LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(client1Link.navigatedTo).toBe(`/Clients/Details/${client1.Id}`);
  });

  it('can click Clients/Details/:clients[1].id link in template', () => {
    const client2LinkDebugElement = routerLinkDebugElements[2];
    const client2Link = routerLinks[2];

    expect(client2Link.navigatedTo).toBeNull('should not have navigated yet');

    client2LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(client2Link.navigatedTo).toBe(`/Clients/Details/${client2.Id}`);
  });

});

function setup() {
  TestBed.configureTestingModule({
    declarations: [
      IndexComponent,
      RouterLinkDirectiveStub,
      RouterOutletStubComponent
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: { 'clients': clients }
          }
        }
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { index: of() })
      }
    ],
    imports: [
      GridModule
    ]
  });
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  page = new IndexPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
