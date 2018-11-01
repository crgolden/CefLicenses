import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { CreatePage } from '../../../../test/page-models/clients/create-page';
import { CreateComponent } from './create.component';
import { ClientsService } from '../../../services/clients.service';
import { FeaturesService } from '../../../services/features.service';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';

const feature1: Feature = {
  id: '1',
  name: 'Feature 1',
  isCore: false,
  clientFeatures: new Array<ClientFeature>()
};
const feature2: Feature = {
  id: '2',
  name: 'Feature 2',
  isCore: true,
  clientFeatures: new Array<ClientFeature>()
};
const features = [feature1, feature2];
const featuresGridDataResult: GridDataResult = {
  data: features,
  total: features.length
};
let component: CreateComponent;
let fixture: ComponentFixture<CreateComponent>;
let page: CreatePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientsService: ClientsService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('CreateComponent', () => {

  beforeEach(() => setup());

  it('should have a new client', () => {
    expect(component.client.id).toBeUndefined();
    expect(component.client.name).toBeUndefined();
  });

  it('should have the features', () => {
    expect(component.features).toEqual(featuresGridDataResult);
  });

  it('should display blank inputs', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe('');
    });
  });

  it('should call create and navigate on submit', () => {
    const form = { valid: true } as NgForm;

    component.create(form);
    expect(clientsService.create).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Features/Details/${feature1.id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${feature2.id}`);
    expect(routerLinks[2].linkParams).toBe('/Clients');
  });

  it('can click Features/Details/:feature1.Id link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[0];
    const clientsLink = routerLinks[0];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe(`/Features/Details/${feature1.id}`);
  });

  it('can click Features/Details/:feature2.Id link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[1];
    const clientsLink = routerLinks[1];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe(`/Features/Details/${feature2.id}`);
  });

  it('can click Clients link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[2];
    const clientsLink = routerLinks[2];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe('/Clients');
  });

});

function setup() {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      GridModule,
      FontAwesomeModule
      ],
    declarations: [
      CreateComponent,
      RouterLinkDirectiveStub,
      RouterOutletStubComponent
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: { 'features': featuresGridDataResult }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { create: of() })
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { index: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(CreateComponent);
  component = fixture.componentInstance;
  clientsService = fixture.debugElement.injector.get(ClientsService);
  router = fixture.debugElement.injector.get(Router);
  page = new CreatePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
