import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../test/page-models/clients/details-page';
import { DetailsComponent } from './details.component';
import { Client } from '../../models/client';

const client: Client = {
  Id: '1',
  Name: 'Client 1'
};
let component: DetailsComponent;
let fixture: ComponentFixture<DetailsComponent>;
let page: DetailsPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('DetailsComponent', () => {

  beforeEach(() => setup());

  it('should have the client', () => {
    expect(component.model.Id).toBe(client.Id);
    expect(component.model.Name).toBe(client.Name);
  });

  it('should display client details', () => {
    expect(page.name).toBe(component.model.Name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Edit/${client.Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Clients/Delete/${client.Id}`);
    expect(routerLinks[2].linkParams).toBe('/Clients');
  });

  it('can click Clients/Edit/:clientId link in template', () => {
    const clientLinkDebugElement = routerLinkDebugElements[0];
    const clientLink = routerLinks[0];

    expect(clientLink.navigatedTo).toBeNull('should not have navigated yet');

    clientLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientLink.navigatedTo).toBe(`/Clients/Edit/${client.Id}`);
  });

  it('can click Clients/Delete/:clientId link in template', () => {
    const clientLinkDebugElement = routerLinkDebugElements[1];
    const clientLink = routerLinks[1];

    expect(clientLink.navigatedTo).toBeNull('should not have navigated yet');

    clientLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientLink.navigatedTo).toBe(`/Clients/Delete/${client.Id}`);
  });

  it('can click Clients link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[2];
    const clientsLink = routerLinks[2];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe('/Clients');
  });

});

function setup() {
  TestBed.configureTestingModule({
    declarations: [
      DetailsComponent,
      RouterLinkDirectiveStub,
      RouterOutletStubComponent
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: { 'client': client }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      }
    ]
  });
  fixture = TestBed.createComponent(DetailsComponent);
  component = fixture.componentInstance;
  page = new DetailsPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
