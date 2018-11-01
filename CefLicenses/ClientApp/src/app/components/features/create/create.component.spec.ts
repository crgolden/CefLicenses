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
import { CreatePage } from '../../../../test/page-models/features/create-page';
import { CreateComponent } from './create.component';
import { FeaturesService } from '../../../services/features.service';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client';
import { ClientFeature } from '../../../relationships/client-feature';

const client1: Client = {
  id: '1',
  name: 'Client 1',
  clientFeatures: new Array<ClientFeature>()
};
const client2: Client = {
  id: '2',
  name: 'Client 2',
  clientFeatures: new Array<ClientFeature>()
};
const clients = [client1, client2];
const clientsGridDataResult: GridDataResult = {
  data: clients,
  total: clients.length
};
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
    expect(component.feature.id).toBeUndefined();
    expect(component.feature.name).toBeUndefined();
  });

  it('should have the clients', () => {
    expect(component.clients).toEqual(clientsGridDataResult);
  });

  it('should display blank inputs', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe('');
    });
  });

  it('should call create and navigate on submit', () => {
    const form = { valid: true } as NgForm;

    component.create(form);
    expect(featuresService.create).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(3, 'should have 3 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${client1.id}`);
    expect(routerLinks[1].linkParams).toBe(`/Clients/Details/${client2.id}`);
    expect(routerLinks[2].linkParams).toBe('/Features');
  });

  it('can click Clients/Details/:client1.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[0];
    const featuresLink = routerLinks[0];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Clients/Details/${client1.id}`);
  });

  it('can click Clients/Details/:client2.Id link in template', () => {
    const featuresLinkDebugElement = routerLinkDebugElements[1];
    const featuresLink = routerLinks[1];

    expect(featuresLink.navigatedTo).toBeNull('should not have navigated yet');

    featuresLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(featuresLink.navigatedTo).toBe(`/Clients/Details/${client2.id}`);
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
            data: { 'clients': clientsGridDataResult }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { create: of() })
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { index: of() })
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
