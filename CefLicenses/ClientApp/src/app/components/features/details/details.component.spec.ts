import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../../test/page-models/features/details-page';
import { DetailsComponent } from './details.component';
import { Feature } from '../../../models/feature';
import { Client } from '../../../models/client';
import { ClientFeature } from '../../../relationships/client-feature';

const feature: Feature = {
  id: '1',
  name: 'Feature 1',
  isCore: false,
  clientFeatures: new Array<ClientFeature>()
};
const client1: Client = {
  id: '1',
  name: 'Client 1',
  clientFeatures: new Array<ClientFeature>()
};
const client2: Client = {
  id: '2',
  name: 'Client 2',
  clientFeatures: new Array<ClientFeature>()
};
const clientFeature1: ClientFeature = {
  model1Id: client1.id,
  model1Name: client1.name,
  model2Id: feature.id,
  model2Name: feature.name,
  expirationDate: new Date()
};
const clientFeature2: ClientFeature = {
  model1Id: client2.id,
  model1Name: client2.name,
  model2Id: feature.id,
  model2Name: feature.name,
  expirationDate: new Date()
};
feature.clientFeatures.push(clientFeature1);
feature.clientFeatures.push(clientFeature2);
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

  it('should have the feature', () => {
    expect(component.feature.id).toBe(feature.id);
    expect(component.feature.name).toBe(feature.name);
  });

  it('should display feature details', () => {
    expect(page.name).toBe(component.feature.name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature1.model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/Clients/Details/${clientFeature2.model1Id}`);
    expect(routerLinks[3].linkParams).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
    expect(routerLinks[4].linkParams).toBe('/Features');
    expect(routerLinks[5].linkParams).toBe(`/Features/Edit/${feature.id}`);
    expect(routerLinks[6].linkParams).toBe(`/Features/Delete/${feature.id}`);
  });

  it('can click Clients/Details/:clientFeature1.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature1.model1Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature1.Model1Id/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[1];
    const createLink = routerLinks[1];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
  });

  it('can click Clients/Details/:clientFeature2.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature2.model1Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature2.Model1Id/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[3];
    const createLink = routerLinks[3];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
  });

  it('can click Features link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[4];
    const featuresLink = routerLinks[4];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe('/Features');
  });

  it('can click Features/Edit/:feature.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[5];
    const featuresLink = routerLinks[5];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Edit/${feature.id}`);
  });

  it('can click Features/Delete/:feature.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[6];
    const featuresLink = routerLinks[6];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Delete/${feature.id}`);
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
            data: { 'feature': feature }
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
