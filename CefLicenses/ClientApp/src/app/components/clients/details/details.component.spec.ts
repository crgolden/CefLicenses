import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../../test/page-models/clients/details-page';
import { DetailsComponent } from './details.component';
import { Client } from '../../../models/client';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';

const client: Client = {
  id: '1',
  name: 'Client 1',
  clientFeatures: new Array<ClientFeature>()
};
const feature1: Feature = {
  id: '1',
  name: 'Feature 1',
  isCore: true,
  clientFeatures: new Array<ClientFeature>()
};
const feature2: Feature = {
  id: '2',
  name: 'Feature 2',
  isCore: false,
  clientFeatures: new Array<ClientFeature>()
};
const clientFeature1: ClientFeature = {
  model1Id: client.id,
  model1Name: client.name,
  model2Id: feature1.id,
  model2Name: feature1.name,
  expirationDate: new Date()
};
const clientFeature2: ClientFeature = {
  model1Id: client.id,
  model1Name: client.name,
  model2Id: feature2.id,
  model2Name: feature2.name,
  expirationDate: new Date()
};
client.clientFeatures.push(clientFeature1);
client.clientFeatures.push(clientFeature2);
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
    expect(component.client.id).toBe(client.id);
    expect(component.client.name).toBe(client.name);
  });

  it('should display client details', () => {
    expect(page.name).toBe(component.client.name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${clientFeature1.model2Id}`);
    expect(routerLinks[1].linkParams).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/Features/Details/${clientFeature2.model2Id}`);
    expect(routerLinks[3].linkParams).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
    expect(routerLinks[4].linkParams).toBe('/Clients');
    expect(routerLinks[5].linkParams).toBe(`/Clients/Edit/${client.id}`);
    expect(routerLinks[6].linkParams).toBe(`/Clients/Delete/${client.id}`);
  });

  it('can click Features/Details/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature1.model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature1.Model1Id/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[1];
    const createLink = routerLinks[1];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
  });

  it('can click Features/Details/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature2.model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature2.Model1Id/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[3];
    const createLink = routerLinks[3];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
  });

  it('can click Clients link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[4];
    const clientsLink = routerLinks[4];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe('/Clients');
  });

  it('can click Clients/Edit/:client.Id link in template', () => {
    const clientLinkDebugElement = routerLinkDebugElements[5];
    const clientLink = routerLinks[5];

    expect(clientLink.navigatedTo).toBeNull('should not have navigated yet');

    clientLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientLink.navigatedTo).toBe(`/Clients/Edit/${client.id}`);
  });

  it('can click Clients/Delete/:client.Id link in template', () => {
    const clientLinkDebugElement = routerLinkDebugElements[6];
    const clientLink = routerLinks[6];

    expect(clientLink.navigatedTo).toBeNull('should not have navigated yet');

    clientLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientLink.navigatedTo).toBe(`/Clients/Delete/${client.id}`);
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
      GridModule,
      FontAwesomeModule
    ]
  });
  fixture = TestBed.createComponent(DetailsComponent);
  component = fixture.componentInstance;
  page = new DetailsPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
