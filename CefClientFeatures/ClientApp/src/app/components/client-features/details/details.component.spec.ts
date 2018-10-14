import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../../test/page-models/client-features/details-page';
import { DetailsComponent } from './details.component';
import { ClientFeature } from '../../../relationships/client-feature';

const clientFeature: ClientFeature = {
  Model1Id: '1',
  Model1Name: 'Name 1',
  Model2Id: '2',
  Model2Name: 'Name 2',
  ExpirationDate: new Date()
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
    expect(component.clientFeature.Model1Id).toBe(clientFeature.Model1Id);
    expect(component.clientFeature.Model2Id).toBe(clientFeature.Model2Id);
  });

  it('should display clientFeature details', () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const expirationDate = component.clientFeature.ExpirationDate.toLocaleDateString('en-US', options);

    expect(page.client).toBe(component.clientFeature.Model1Name);
    expect(page.feature).toBe(component.clientFeature.Model2Name);
    expect(page.expirationDate).toBe(expirationDate);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(5, 'should have 5 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature.Model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature.Model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/ClientFeatures/Edit/${clientFeature.Model1Id}/${clientFeature.Model2Id}`);
    expect(routerLinks[3].linkParams).toBe(`/ClientFeatures/Delete/${clientFeature.Model1Id}/${clientFeature.Model2Id}`);
    expect(routerLinks[4].linkParams).toBe('/ClientFeatures');
  });

  it('can click Clients/Details/:clientFeature.Model1Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[0];
    const clientFeatureLink = routerLinks[0];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/Clients/Details/${clientFeature.Model1Id}`);
  });

  it('can click Features/Details/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[1];
    const clientFeatureLink = routerLinks[1];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/Features/Details/${clientFeature.Model2Id}`);
  });

  it('can click ClientFeatures/Edit/:clientFeature.Model1Id/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[2];
    const clientFeatureLink = routerLinks[2];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/ClientFeatures/Edit/${clientFeature.Model1Id}/${clientFeature.Model2Id}`);
  });

  it('can click ClientFeatures/Delete/:clientFeature.Model1Id/:clientFeature.Model2Id link in template', () => {
    const clientFeatureLinkDebugElement = routerLinkDebugElements[3];
    const clientFeatureLink = routerLinks[3];

    expect(clientFeatureLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeatureLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeatureLink.navigatedTo).toBe(`/ClientFeatures/Delete/${clientFeature.Model1Id}/${clientFeature.Model2Id}`);
  });

  it('can click ClientFeatures link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[4];
    const clientFeaturesLink = routerLinks[4];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe('/ClientFeatures');
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
