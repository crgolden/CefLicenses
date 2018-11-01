import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../../test/page-models/client-features/details-page';
import { DetailsComponent } from './details.component';
import { ClientFeature } from '../../../relationships/client-feature';

const clientFeature: ClientFeature = {
  model1Id: '1',
  model1Name: 'Client 1',
  model2Id: '1',
  model2Name: 'Feature 1',
  expirationDate: new Date()
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

  it('should have the clientFeature', () => {
    expect(component.clientFeature.model1Id).toBe(clientFeature.model1Id);
    expect(component.clientFeature.model2Id).toBe(clientFeature.model2Id);
  });

  it('should display clientFeature details', () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const expirationDate = component.clientFeature.expirationDate.toLocaleDateString('en-US', options);

    expect(page.client).toBe(component.clientFeature.model1Name);
    expect(page.feature).toBe(component.clientFeature.model2Name);
    expect(page.expirationDate).toBe(expirationDate);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(5, 'should have 5 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature.model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature.model2Id}`);
    expect(routerLinks[2].linkParams).toBe('/ClientFeatures');
    expect(routerLinks[3].linkParams).toBe(`/ClientFeatures/Edit/${clientFeature.model1Id}/${clientFeature.model2Id}`);
    expect(routerLinks[4].linkParams).toBe(`/ClientFeatures/Delete/${clientFeature.model1Id}/${clientFeature.model2Id}`);
  });

  it('can click Clients/Details/:clientFeature.Model1Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[0];
    const clientFeatureLink = routerLinks[0];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/Clients/Details/${clientFeature.model1Id}`);
  });

  it('can click Features/Details/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[1];
    const clientFeatureLink = routerLinks[1];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/Features/Details/${clientFeature.model2Id}`);
  });

  it('can click ClientFeatures link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[2];
    const clientFeaturesLink = routerLinks[2];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe('/ClientFeatures');
  });

  it('can click ClientFeatures/Edit/:clientFeature.Model1Id/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[3];
    const clientFeatureLink = routerLinks[3];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/ClientFeatures/Edit/${clientFeature.model1Id}/${clientFeature.model2Id}`);
  });

  it('can click ClientFeatures/Delete/:clientFeature.Model1Id/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[4];
    const clientFeatureLink = routerLinks[4];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/ClientFeatures/Delete/${clientFeature.model1Id}/${clientFeature.model2Id}`);
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
            data: { 'clientFeature': clientFeature }
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
