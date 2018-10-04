import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { IndexPage } from '../../../test/page-models/clients/index-page';
import { IndexComponent } from './index.component';
import { Client } from '../../models/client';

const clientId1 = '1';
const clientId2 = '2';
const client1: Client = {
  id: clientId1,
  name: 'Client 1'
};
const client2: Client = {
  id: clientId2,
  name: 'Client 2'
};
const clients: Array<Client> = [client1, client2];
let component: IndexComponent;
let fixture: ComponentFixture<IndexComponent>;
let page: IndexPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('IndexComponent', () => {

  beforeEach(() => setup());

  it('should have the clients', () => {
    expect(component.clients.length).toBe(2);
  });

  it('should display clients', () => {
    const clientRow1 = page.rows[1];
    const clientRow2 = page.rows[2];
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

    expect(clientRow1Name).toBe(client1.name);
    expect(clientRow2Name).toBe(client2.name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientId1}`);
    expect(routerLinks[1].linkParams).toBe(`/Clients/Details/${clientId2}`);
    expect(routerLinks[2].linkParams).toBe('/Clients/Create');
  });

  it('can click Clients/Details/:clients[0].id link in template', () => {
    const client1LinkDebugElement = routerLinkDebugElements[0];
    const client1Link = routerLinks[0];

    expect(client1Link.navigatedTo).toBeNull('should not have navigated yet');

    client1LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(client1Link.navigatedTo).toBe(`/Clients/Details/${clientId1}`);
  });

  it('can click Clients/Details/:clients[1].id link in template', () => {
    const client2LinkDebugElement = routerLinkDebugElements[1];
    const client2Link = routerLinks[1];

    expect(client2Link.navigatedTo).toBeNull('should not have navigated yet');

    client2LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(client2Link.navigatedTo).toBe(`/Clients/Details/${clientId2}`);
  });

  it('can click Clients/Create link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe('/Clients/Create');
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
      }
    ]
  });
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  page = new IndexPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
