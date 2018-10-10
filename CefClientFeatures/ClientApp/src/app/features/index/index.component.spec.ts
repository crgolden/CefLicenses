import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { IndexPage } from '../../../test/page-models/features/index-page';
import { IndexComponent } from './index.component';
import { Feature } from '../../models/feature';

const feature1: Feature = {
  id: '1',
  name: 'Feature 1'
};
const feature2: Feature = {
  id: '2',
  name: 'Feature 2'
};
const features: Array<Feature> = [feature1, feature2];
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
    expect(component.features.length).toBe(2);
  });

  it('should display features', () => {
    const featureRow1 = page.rows[1];
    const featureRow2 = page.rows[2];
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

    expect(featureRow1Name).toBe(feature1.name);
    expect(featureRow2Name).toBe(feature2.name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${feature1.id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${feature2.id}`);
    expect(routerLinks[2].linkParams).toBe('/Features/Create');
  });

  it('can click Features/Details/:features[0].id link in template', () => {
    const feature1LinkDebugElement = routerLinkDebugElements[0];
    const feature1Link = routerLinks[0];

    expect(feature1Link.navigatedTo).toBeNull('should not have navigated yet');

    feature1LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature1Link.navigatedTo).toBe(`/Features/Details/${feature1.id}`);
  });

  it('can click Features/Details/:features[1].id link in template', () => {
    const feature2LinkDebugElement = routerLinkDebugElements[1];
    const feature2Link = routerLinks[1];

    expect(feature2Link.navigatedTo).toBeNull('should not have navigated yet');

    feature2LinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(feature2Link.navigatedTo).toBe(`/Features/Details/${feature2.id}`);
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
      }
    ]
  });
  fixture = TestBed.createComponent(IndexComponent);
  component = fixture.componentInstance;
  page = new IndexPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
