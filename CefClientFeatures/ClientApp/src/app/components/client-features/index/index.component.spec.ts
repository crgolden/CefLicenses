import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { IndexPage } from '../../../../test/page-models/client-features/index-page';
import { IndexComponent } from './index.component';
import { ClientFeature } from '../../../relationships/client-feature';
import { ClientFeaturesService } from '../../../services/client-features.service';

const clientFeature1: ClientFeature = {
  Model1Id: '1',
  Model1Name: 'Name 1',
  Model2Id: '2',
  Model2Name: 'Name 2',
  ExpirationDate: new Date()
};
const clientFeature2: ClientFeature = {
  Model1Id: '1',
  Model1Name: 'Name 1',
  Model2Id: '3',
  Model2Name: 'Name 3',
  ExpirationDate: new Date()
};
const clientFeatures = {
  data: [clientFeature1, clientFeature2],
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

  it('should have the clientFeatures', () => {
    expect(component.clientFeatures.total).toBe(clientFeatures.total);
  });

  it('should display clientFeatures', () => {
    const cleanText = (text: string): string => text == null ? '' : text.trim();
    const clientFeatureRow1 = page.rows[2];
    const clientFeatureRow2 = page.rows[3];
    const clientFeatureRow1ClientName = cleanText(clientFeatureRow1.children[0].textContent);
    const clientFeatureRow1FeatureName = cleanText(clientFeatureRow1.children[1].textContent);
    const clientFeatureRow1Details = cleanText(clientFeatureRow1.children[2].textContent);
    const clientFeatureRow2ClientName = cleanText(clientFeatureRow2.children[0].textContent);
    const clientFeatureRow2FeatureName = cleanText(clientFeatureRow2.children[1].textContent);
    const clientFeatureRow2Details = cleanText(clientFeatureRow2.children[2].textContent);

    expect(clientFeatureRow1ClientName).toBe(`${clientFeature1.Model1Name}`);
    expect(clientFeatureRow1FeatureName).toBe(`${clientFeature1.Model2Name}`);
    expect(clientFeatureRow1Details).toBe('Details');
    expect(clientFeatureRow2ClientName).toBe(`${clientFeature2.Model1Name}`);
    expect(clientFeatureRow2FeatureName).toBe(`${clientFeature2.Model2Name}`);
    expect(clientFeatureRow2Details).toBe('Details');
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(7, 'should have 7 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature1.Model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature1.Model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/ClientFeatures/Details/${clientFeature1.Model1Id}/${clientFeature1.Model2Id}`);
    expect(routerLinks[3].linkParams).toBe(`/Clients/Details/${clientFeature2.Model1Id}`);
    expect(routerLinks[4].linkParams).toBe(`/Features/Details/${clientFeature2.Model2Id}`);
    expect(routerLinks[5].linkParams).toBe(`/ClientFeatures/Details/${clientFeature2.Model1Id}/${clientFeature2.Model2Id}`);
    expect(routerLinks[6].linkParams).toBe('/ClientFeatures/Create');
  });

  it('can click Clients/Details/:clientFeature1.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature1.Model1Id}`);
  });

  it('can click Features/Details/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[1];
    const createLink = routerLinks[1];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature1.Model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature1.Model1Id/:clientFeature1.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature1.Model1Id}/${clientFeature1.Model2Id}`);
  });

  it('can click Clients/Details/:clientFeature2.Model1Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[3];
    const createLink = routerLinks[3];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Clients/Details/${clientFeature2.Model1Id}`);
  });

  it('can click Features/Details/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[4];
    const createLink = routerLinks[4];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/Features/Details/${clientFeature2.Model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature2.Model1Id/:clientFeature2.Model2Id link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[5];
    const createLink = routerLinks[5];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature2.Model1Id}/${clientFeature2.Model2Id}`);
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
            data: { 'clientFeatures': clientFeatures }
          }
        }
      },
      {
        provide: ClientFeaturesService,
        useValue: jasmine.createSpyObj('ClientFeaturesService', { index: of() })
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
