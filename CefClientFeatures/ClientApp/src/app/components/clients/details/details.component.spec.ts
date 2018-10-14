import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../../test/page-models/clients/details-page';
import { DetailsComponent } from './details.component';
import { Client } from '../../../models/client';
import { ClientFeature } from '../../../relationships/client-feature';

const client: Client = {
  Id: '1',
  Name: 'Client 1',
  ClientFeatures: new Array<ClientFeature>()
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
    expect(component.client.Id).toBe(client.Id);
    expect(component.client.Name).toBe(client.Name);
  });

  it('should display client details', () => {
    expect(page.name).toBe(component.client.Name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Edit/${client.Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Clients/Delete/${client.Id}`);
    expect(routerLinks[2].linkParams).toBe('/Clients');
  });

  it('can click Clients/Edit/:client.Id link in template', () => {
    const clientLinkDebugElement = routerLinkDebugElements[0];
    const clientLink = routerLinks[0];

    expect(clientLink.navigatedTo).toBeNull('should not have navigated yet');

    clientLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientLink.navigatedTo).toBe(`/Clients/Edit/${client.Id}`);
  });

  it('can click Clients/Delete/:client.Id link in template', () => {
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
    ],
    imports: [
      GridModule
    ]
  });
  fixture = TestBed.createComponent(DetailsComponent);
  component = fixture.componentInstance;
  page = new DetailsPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
