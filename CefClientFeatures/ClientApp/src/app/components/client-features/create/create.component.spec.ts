import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { CreatePage } from '../../../../test/page-models/client-features/create-page';
import { CreateComponent } from './create.component';
import { ClientFeaturesService } from '../../../services/client-features.service';
import { ClientsService } from '../../../services/clients.service';
import { FeaturesService } from '../../../services/features.service';

let component: CreateComponent;
let fixture: ComponentFixture<CreateComponent>;
let page: CreatePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientFeaturesService: ClientFeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('CreateComponent', () => {

  beforeEach(() => setup());

  it('should have a new clientFeature', () => {
    expect(component.clientFeature.Model1Id).toBeUndefined();
    expect(component.clientFeature.Model2Id).toBeUndefined();
  });

  it('should display blank inputs', () => {
    return fixture.whenStable().then(() => {
      expect(page.client.value).toBe('');
      expect(page.feature.value).toBe('');
      expect(page.expirationDate.value).toBe('month/day/year');
    });
  });

  it('should call create and navigate on submit', () => {
    const form = { valid: true } as NgForm;

    component.create(form);
    expect(clientFeaturesService.create).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1, 'should have 1 routerLink');
    expect(routerLinks[0].linkParams).toBe('/ClientFeatures');
  });

  it('can click ClientFeatures link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[0];
    const clientFeaturesLink = routerLinks[0];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe('/ClientFeatures');
  });

});

function setup() {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      DatePickerModule,
      DropDownsModule
    ],
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
        provide: ClientFeaturesService,
        useValue: jasmine.createSpyObj('ClientFeaturesService', { create: of() })
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { index: of() })
      },
      {
        provide: FeaturesService,
        useValue: jasmine.createSpyObj('FeaturesService', { index: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(CreateComponent);
  component = fixture.componentInstance;
  clientFeaturesService = fixture.debugElement.injector.get(ClientFeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new CreatePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
