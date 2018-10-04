import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { DetailsPage } from '../../../test/page-models/features/details-page';
import { DetailsComponent } from './details.component';
import { Feature } from '../../models/feature';

const feature: Feature = {
    id: '1',
    name: 'Feature 1'
  };
let component: DetailsComponent;
let fixture: ComponentFixture<DetailsComponent>;
let page: DetailsPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('DetailsComponent', () => {

  beforeEach(() => setup());

  it('should have the feature', () => {
    expect(component.model.id).toBe(feature.id);
    expect(component.model.name).toBe(feature.name);
  });

  it('should display feature details', () => {
    expect(page.name).toBe(component.model.name);
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Edit/${feature.id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Delete/${feature.id}`);
    expect(routerLinks[2].linkParams).toBe('/Features');
  });

  it('can click Features/Edit/:featureId link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[0];
    const featuresLink = routerLinks[0];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Edit/${feature.id}`);
  });

  it('can click Features/Delete/:featureId link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[1];
    const featuresLink = routerLinks[1];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Delete/${feature.id}`);
  });

  it('can click Features link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[2];
    const featuresLink = routerLinks[2];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe('/Features');
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
    ]
  });
  fixture = TestBed.createComponent(DetailsComponent);
  component = fixture.componentInstance;
  page = new DetailsPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
