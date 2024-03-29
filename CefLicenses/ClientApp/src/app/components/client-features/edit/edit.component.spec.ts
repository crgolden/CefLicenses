import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { EditPage } from '../../../../test/page-models/client-features/edit-page';
import { EditComponent } from './edit.component';
import { ClientFeature } from '../../../relationships/client-feature';
import { ClientFeaturesService } from '../../../services/client-features.service';

const clientFeature: ClientFeature = {
  model1Id: '1',
  model1Name: 'Client 1',
  model2Id: '1',
  model2Name: 'Feature 1',
  expirationDate: new Date()
};
let component: EditComponent;
let fixture: ComponentFixture<EditComponent>;
let page: EditPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientFeaturesService: ClientFeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('EditComponent', () => {

  beforeEach(() => setup());

  it('should have the clientFeature', () => {
    expect(component.clientFeature.model1Id).toBe(clientFeature.model1Id);
    expect(component.clientFeature.model2Id).toBe(clientFeature.model2Id);
  });

  it('should display clientFeature details', () => {
    return fixture.whenStable().then(() => {
      expect(page.client).toBe(component.clientFeature.model1Name);
      expect(page.feature).toBe(component.clientFeature.model2Name);
      expect(page.expirationDate.value).toBe('month/day/year');
    });
  });

  it('should call edit and navigate on submit', () => {
    const form = { valid: true } as NgForm;

    component.edit(form);
    expect(clientFeaturesService.edit).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(4, 'should have 4 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature.model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature.model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/ClientFeatures/Details/${clientFeature.model1Id}/${clientFeature.model2Id}`);
    expect(routerLinks[3].linkParams).toBe('/ClientFeatures');
  });

  it('can click Clients/Details/:clientFeature.Model1Id link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[0];
    const clientFeaturesLink = routerLinks[0];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe(`/Clients/Details/${clientFeature.model1Id}`);
  });

  it('can click Features/Details/:clientFeature.Model2Id link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[1];
    const clientFeaturesLink = routerLinks[1];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe(`/Features/Details/${clientFeature.model2Id}`);
  });

  it('can click ClientFeatures/Details/:clientFeature.Model1Id/:clientFeatures.Model2Id link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[2];
    const clientFeaturesLink = routerLinks[2];

    expect(clientFeaturesLink.navigatedTo).toBeNull('should not have navigated yet');

    clientFeaturesLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientFeaturesLink.navigatedTo).toBe(`/ClientFeatures/Details/${clientFeature.model1Id}/${clientFeature.model2Id}`);
  });

  it('can click ClientFeatures link in template', () => {
    const clientFeaturesLinkDebugElement = routerLinkDebugElements[3];
    const clientFeaturesLink = routerLinks[3];

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
      FontAwesomeModule
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
            data: { 'clientFeature': clientFeature }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', {
          navigate: of([`/ClientFeatures/Details/${clientFeature.model1Id}/${clientFeature.model2Id}`])
        })
      },
      {
        provide: ClientFeaturesService,
        useValue: jasmine.createSpyObj('ClientFeaturesService', { edit: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(EditComponent);
  component = fixture.componentInstance;
  clientFeaturesService = fixture.debugElement.injector.get(ClientFeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new EditPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
