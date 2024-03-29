import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DeletePage } from '../../../../test/page-models/features/delete-page';
import { DeleteComponent } from './delete.component';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';
import { FeaturesService } from '../../../services/features.service';

const feature: Feature = {
  id: '1',
  name: 'Feature 1',
  isCore: false,
  clientFeatures: new Array<ClientFeature>()
};
let component: DeleteComponent;
let fixture: ComponentFixture<DeleteComponent>;
let page: DeletePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let featuresService: FeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('DeleteComponent', () => {

  beforeEach(() => setup());

  it('should have the feature', () => {
    expect(component.feature.id).toBe(feature.id);
    expect(component.feature.name).toBe(feature.name);
  });

  it('should display feature details', () => {
    expect(page.name).toBe(component.feature.name);
  });

  it('should call delete and navigate on submit', () => {
    component.delete();
    expect(featuresService.delete).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${feature.id}`);
    expect(routerLinks[1].linkParams).toBe('/Features');
  });

  it('can click Features/Details/:feature.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[0];
    const featuresLink = routerLinks[0];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Details/${feature.id}`);
  });

  it('can click Features link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[1];
    const featuresLink = routerLinks[1];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe('/Features');
  });

});

function setup() {
  TestBed.configureTestingModule({
    imports: [
      FontAwesomeModule
    ],
    declarations: [
      DeleteComponent,
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
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { delete: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(DeleteComponent);
  component = fixture.componentInstance;
  featuresService = fixture.debugElement.injector.get(FeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new DeletePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
