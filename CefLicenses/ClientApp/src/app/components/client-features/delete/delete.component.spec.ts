import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DeletePage } from '../../../../test/page-models/client-features/delete-page';
import { DeleteComponent } from './delete.component';
import { ClientFeature } from '../../../relationships/client-feature';
import { ClientFeaturesService } from '../../../services/client-features.service';

const clientFeature: ClientFeature = {
  model1Id: '1',
  model1Name: 'Client 1',
  model2Id: '1',
  model2Name: 'Feature 1',
  expirationDate: new Date()
};
let component: DeleteComponent;
let fixture: ComponentFixture<DeleteComponent>;
let page: DeletePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientFeaturesService: ClientFeaturesService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('DeleteComponent', () => {

  beforeEach(() => setup());

  it('should have the clientFeature', () => {
    expect(component.clientFeature.model1Id).toBe(clientFeature.model1Id);
    expect(component.clientFeature.model2Id).toBe(clientFeature.model2Id);
  });

  it('should display clientFeature details', () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const expirationDate = component.clientFeature.expirationDate.toLocaleDateString('en-US', options);

    expect(page.client).toBe(component.clientFeature.model1Name);
    expect(page.feature).toBe(component.clientFeature.model2Name);
    expect(page.expirationDate).toBe(expirationDate);
  });

  it('should call delete and navigate on submit', () => {
    component.delete();
    expect(clientFeaturesService.delete).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(4, 'should have 4 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${clientFeature.model1Id}`);
    expect(routerLinks[1].linkParams).toBe(`/Features/Details/${clientFeature.model2Id}`);
    expect(routerLinks[2].linkParams).toBe(`/ClientFeatures/Details/${clientFeature.model1Id}/${clientFeature.model2Id}`);
    expect(routerLinks[3].linkParams).toBe('/ClientFeatures');
  });

  it('can click ClientFeatures/Details/:clientFeature.Model1Id/:clientFeature.Model2Id link in template', () => {
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
            data: { 'clientFeature': clientFeature }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      },
      {
        provide: ClientFeaturesService,
        useValue: jasmine.createSpyObj('ClientFeaturesService', {delete: of()})
      }
    ]
  });
  fixture = TestBed.createComponent(DeleteComponent);
  component = fixture.componentInstance;
  clientFeaturesService = fixture.debugElement.injector.get(ClientFeaturesService);
  router = fixture.debugElement.injector.get(Router);
  page = new DeletePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
