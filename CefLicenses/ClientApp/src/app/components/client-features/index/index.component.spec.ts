import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { IndexPage } from '../../../../test/page-models/client-features/index-page';
import { IndexComponent } from './index.component';
import { ClientFeature } from '../../../relationships/client-feature';
import { ClientFeaturesService } from '../../../services/client-features.service';

const clientFeature1: ClientFeature = {
  model1Id: '1',
  model1Name: 'Client 1',
  model2Id: '1',
  model2Name: 'Feature 1',
  expirationDate: new Date()
};
const clientFeature2: ClientFeature = {
  model1Id: '1',
  model1Name: 'Client 1',
  model2Id: '2',
  model2Name: 'Feature 2',
  expirationDate: new Date()
};
const clientFeatures = [clientFeature1, clientFeature2];
const clientFeaturesGridDataResult = {
  data: clientFeatures,
  total: clientFeatures.length
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

  it('should have the clientFeatures', () => {
    expect(component.clientFeatures.total).toBe(clientFeatures.length);
  });

  it('should display clientFeatures', () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const cleanText = (text: string): string => text == null ? '' : text.trim();
    const clientFeatureRow1 = page.rows[2];
    const clientFeatureRow2 = page.rows[3];
    const clientFeatureRow1ClientName = cleanText(clientFeatureRow1.children[0].textContent);
    const clientFeatureRow1FeatureName = cleanText(clientFeatureRow1.children[1].textContent);
    const clientFeatureRow1ExpirationDate = cleanText(clientFeatureRow1.children[2].textContent);
    const clientFeatureRow2ClientName = cleanText(clientFeatureRow2.children[0].textContent);
    const clientFeatureRow2FeatureName = cleanText(clientFeatureRow2.children[1].textContent);
    const clientFeatureRow2ExpirationDate = cleanText(clientFeatureRow2.children[2].textContent);

    expect(clientFeatureRow1ClientName).toBe(`${clientFeature1.model1Name}`);
    expect(clientFeatureRow1FeatureName).toBe(`${clientFeature1.model2Name}`);
    expect(clientFeatureRow1ExpirationDate).toBe(clientFeature1.expirationDate.toLocaleDateString('en-US', options));
    expect(clientFeatureRow2ClientName).toBe(`${clientFeature2.model1Name}`);
    expect(clientFeatureRow2FeatureName).toBe(`${clientFeature2.model2Name}`);
    expect(clientFeatureRow2ExpirationDate).toBe(clientFeature2.expirationDate.toLocaleDateString('en-US', options));
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature1.model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature1.model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
    expect(routerLinks[3].linkParams).toBe(`/Clients/Details/${clientFeature2.model1Id}`);
    expect(routerLinks[4].linkParams).toBe(`/Features/Details/${clientFeature2.model2Id}`);
    expect(routerLinks[5].linkParams).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
    expect(routerLinks[6].linkParams).toBe('/ClientFeatures/Create');
  });

  it('can click Clients/Details/:clientFeature1.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature1.model1Id}`);
  });

  it('can click Features/Details/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[1];
    const createLink = routerLinks[1];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature1.model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature1.Model1Id/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature1.model1Id}/${clientFeature1.model2Id}`);
  });

  it('can click Clients/Details/:clientFeature2.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[3];
    const createLink = routerLinks[3];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature2.model1Id}`);
  });

  it('can click Features/Details/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[4];
    const createLink = routerLinks[4];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature2.model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature2.Model1Id/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[5];
    const createLink = routerLinks[5];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature2.model1Id}/${clientFeature2.model2Id}`);
  });

  it('can click ClientFeatures/Create link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[6];
    const createLink = routerLinks[6];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe('/ClientFeatures/Create');
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
            data: { 'clientFeatures': clientFeaturesGridDataResult }
          }
        }
      },
      {
        provide: ClientFeaturesService,
        useValue: jasmine.createSpyObj('ClientFeaturesService', { index: of() })
      }
    ],
    imports: [
      GridModule,
      FontAwesomeModule
    ]
  });
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  page = new IndexPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
