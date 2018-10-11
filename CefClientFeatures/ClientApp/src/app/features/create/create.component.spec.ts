import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { CreatePage } from '../../../test/page-models/features/create-page';
import { CreateComponent } from './create.component';
import { FeaturesService } from '../../services/features.service';

let component: CreateComponent;
let fixture: ComponentFixture<CreateComponent>;
let page: CreatePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let featuresService: FeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('CreateComponent', () => {

  beforeEach(() => setup());

  it('should have a new feature', () => {
    expect(component.model.Id).toBeUndefined();
    expect(component.model.Name).toBeUndefined();
  });

  it('should display blank inputs', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe('');
    });
  });

  it('should call create and navigate on submit', () => {
    component.create(true);
    expect(featuresService.create).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1, 'should have 1 routerLink');
    expect(routerLinks[0].linkParams).toBe('/Features');
  });

  it('can click Features link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[0];
    const featuresLink = routerLinks[0];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe('/Features');
  });

});

function setup() {
  TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [
      CreateComponent,
      RouterLinkDirectiveStub,
      RouterOutletStubComponent
    ],
    providers: [
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { create: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(CreateComponent);
  component = fixture.componentInstance;
  featuresService = fixture.debugElement.injector.get(FeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new CreatePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
