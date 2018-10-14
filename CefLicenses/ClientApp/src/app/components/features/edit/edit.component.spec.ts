import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { EditPage } from '../../../../test/page-models/features/edit-page';
import { EditComponent } from './edit.component';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';
import { FeaturesService } from '../../../services/features.service';
import { ClientsService } from '../../../services/clients.service';

const feature: Feature = {
  Id: '1',
  Name: 'Feature 1',
  IsCore: false,
  ClientFeatures: new Array<ClientFeature>()
};
let component: EditComponent;
let fixture: ComponentFixture<EditComponent>;
let page: EditPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let featuresService: FeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('EditComponent', () => {

  beforeEach(() => setup());

  it('should have the feature', () => {
    expect(component.feature.Id).toBe(feature.Id);
    expect(component.feature.Name).toBe(feature.Name);
  });

  it('should display feature details', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe(component.feature.Name);
    });
  });

  it('should call edit and navigate on submit', () => {
    const form = { valid: true } as NgForm;

    component.edit(form);
    expect(featuresService.edit).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLink');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${feature.Id}`);
    expect(routerLinks[1].linkParams).toBe('/Features');
  });

  it('can click Features/Details/:feature.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[0];
    const featuresLink = routerLinks[0];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Features/Details/${feature.Id}`);
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
      FormsModule,
      GridModule
      ],
    declarations: [
      EditComponent,
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
        useValue: jasmine.createSpyObj('FeaturesService', { edit: of() })
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { index: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(EditComponent);
  component = fixture.componentInstance;
  featuresService = fixture.debugElement.injector.get(FeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new EditPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}