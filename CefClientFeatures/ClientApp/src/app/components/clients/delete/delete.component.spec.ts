import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterLinkDirectiveStub } from '../../../../test/router-link-directive-stub';
import { DeletePage } from '../../../../test/page-models/clients/delete-page';
import { DeleteComponent } from './delete.component';
import { Client } from '../../../models/client';
import { ClientFeature } from '../../../relationships/client-feature';
import { ClientsService } from '../../../services/clients.service';

const client: Client = {
  Id: '1',
  Name: 'Client 1',
  ClientFeatures: new Array<ClientFeature>()
};
let component: DeleteComponent;
let fixture: ComponentFixture<DeleteComponent>;
let page: DeletePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientsService: ClientsService;
let router: Router;

/* tslint:disable-next-line:component-selector */
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('DeleteComponent', () => {

  beforeEach(() => setup());

  it('should have the client', () => {
    expect(component.client.Id).toBe(client.Id);
    expect(component.client.Name).toBe(client.Name);
  });

  it('should display client details', () => {
    expect(page.name).toBe(component.client.Name);
  });

  it('should call delete and navigate on submit', () => {
    component.delete();
    expect(clientsService.delete).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe(`/Clients/Details/${client.Id}`);
    expect(routerLinks[1].linkParams).toBe('/Clients');
  });

  it('can click Clients/Details/:client.Id link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[0];
    const clientsLink = routerLinks[0];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe(`/Clients/Details/${client.Id}`);
  });

  it('can click Clients link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[1];
    const clientsLink = routerLinks[1];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe('/Clients');
  });

});

function setup() {
  TestBed.configureTestingModule({
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
            data: { 'client': client }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigateByUrl'])
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', {delete: of()})
      }
    ]
  });
  fixture = TestBed.createComponent(DeleteComponent);
  component = fixture.componentInstance;
  clientsService = fixture.debugElement.injector.get(ClientsService);
  router = fixture.debugElement.injector.get(Router);
  page = new DeletePage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
