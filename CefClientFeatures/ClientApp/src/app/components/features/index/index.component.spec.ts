import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { IndexPage } from '../../../../test/page-models/features/index-page';
import { IndexComponent } from './index.component';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';
import { FeaturesService } from '../../../services/features.service';

const feature1: Feature = {
  Id: '1',
  Name: 'Feature 1',
  IsCore: false,
  ClientFeatures: new Array<ClientFeature>()
};
const feature2: Feature = {
  Id: '2',
  Name: 'Feature 2',
  IsCore: false,
  ClientFeatures: new Array<ClientFeature>()
};
const features = {
  data: [feature1, feature2],
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

  it('should have the features', () => {
    expect(component.features.total).toBe(2);
  });

  it('should display features', () => {
    const cleanText = (text: string): string => text == null ? '' : text.trim();
    const featureRow1 = page.rows[2];
    const featureRow2 = page.rows[3];
    const featureRow1Name = cleanText(featureRow1.children[0].textContent);
    const featureRow2Name = cleanText(featureRow2.children[0].textContent);

    expect(featureRow1Name).toBe(feature1.Name);
    expect(featureRow2Name).toBe(feature2.Name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${feature1.Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${feature2.Id}`);
    expect(routerLinks[2].linkParams).toBe('/Features/Create');
  });

  it('can click Features/Details/:features[0].Id link in template', () => {
    const feature1LinkDebugElement = routerLinkDebugElements[0];
    const feature1Link = routerLinks[0];

    expect(feature1Link.navigatedTo).toBeNull('should not have navigated yet');

    feature1LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature1Link.navigatedTo).toBe(`/Features/Details/${feature1.Id}`);
  });

  it('can click Features/Details/:features[1].Id link in template', () => {
    const feature2LinkDebugElement = routerLinkDebugElements[1];
    const feature2Link = routerLinks[1];

    expect(feature2Link.navigatedTo).toBeNull('should not have navigated yet');

    feature2LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature2Link.navigatedTo).toBe(`/Features/Details/${feature2.Id}`);
  });

  it('can click Features/Create link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[2];
    const createLink = routerLinks[2];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe('/Features/Create');
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
            data: { 'features': features }
          }
        }
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { index: of() })
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
