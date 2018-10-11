import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GridModule } from '@progress/kendo-angular-grid';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { IndexPage } from '../../../test/page-models/features/index-page';
import { IndexComponent } from './index.component';
import { Feature } from '../../models/feature';
import { FeaturesService } from '../../services/features.service';

const feature1: Feature = {
  Id: '1',
  Name: 'Feature 1'
};
const feature2: Feature = {
  Id: '2',
  Name: 'Feature 2'
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
    const featureRow1 = page.rows[2];
    const featureRow2 = page.rows[3];
    let featureRow1Name = featureRow1.children[0].textContent;
    let featureRow2Name = featureRow2.children[0].textContent;

    if (featureRow1Name != null) {
      featureRow1Name = featureRow1Name.trim();
    } else {
      featureRow1Name = '';
    }
    if (featureRow2Name != null) {
      featureRow2Name = featureRow2Name.trim();
    } else {
      featureRow2Name = '';
    }

    expect(featureRow1Name).toBe(feature1.Name);
    expect(featureRow2Name).toBe(feature2.Name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/Features/Create');
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${feature1.Id}`);
    expect(routerLinks[2].linkParams).toBe(`/Features/Details/${feature2.Id}`);
  });

  it('can click Features/Create link in template', () => {
    const createLinkDebugElement = routerLinkDebugElements[0];
    const createLink = routerLinks[0];

    expect(createLink.navigatedTo).toBeNull('should not have navigated yet');

    createLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createLink.navigatedTo).toBe('/Features/Create');
  });

  it('can click Features/Details/:features[0].id link in template', () => {
    const feature1LinkDebugElement = routerLinkDebugElements[1];
    const feature1Link = routerLinks[1];

    expect(feature1Link.navigatedTo).toBeNull('should not have navigated yet');

    feature1LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature1Link.navigatedTo).toBe(`/Features/Details/${feature1.Id}`);
  });

  it('can click Features/Details/:features[1].id link in template', () => {
    const feature2LinkDebugElement = routerLinkDebugElements[2];
    const feature2Link = routerLinks[2];

    expect(feature2Link.navigatedTo).toBeNull('should not have navigated yet');

    feature2LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature2Link.navigatedTo).toBe(`/Features/Details/${feature2.Id}`);
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
