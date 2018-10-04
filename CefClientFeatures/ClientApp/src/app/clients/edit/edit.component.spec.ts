import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { EditPage } from '../../../test/page-models/clients/edit-page';
import { EditComponent } from './edit.component';
import { Client } from '../../models/client';
import { ClientsService } from '../clients.service';

const client: Client = {
  id: '1',
  name: 'Client 1'
};
let component: EditComponent;
let fixture: ComponentFixture<EditComponent>;
let page: EditPage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientsService: ClientsService;
let router: Router;

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('EditComponent', () => {

  beforeEach(() => setup());

  it('should have the client', () => {
    expect(component.model.id).toBe(client.id);
    expect(component.model.name).toBe(client.name);
  });

  it('should display client details', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe(component.model.name);
    });
  });

  it('should call edit and navigate on submit', () => {
    component.edit(true);
    expect(clientsService.edit).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalled();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(1, 'should have 1 routerLink');
    expect(routerLinks[0].linkParams).toBe('/Clients');
  });

  it('can click Clients link in template', () => {
    const clientsLinkDebugElement = routerLinkDebugElements[0];
    const clientsLink = routerLinks[0];

    expect(clientsLink.navigatedTo).toBeNull('should not have navigated yet');

    clientsLinkDebugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(clientsLink.navigatedTo).toBe('/Clients');
  });

});

function setup() {
  TestBed.configureTestingModule({
    imports: [FormsModule],
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
            data: { 'client': client }
          }
        }
      },
      {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', { navigate: of([`/Clients/Details/${client.id}`]) })
      },
      {
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { edit: of() })
      }
    ]
  });
  fixture = TestBed.createComponent(EditComponent);
  component = fixture.componentInstance;
  clientsService = fixture.debugElement.injector.get(ClientsService);
  router = fixture.debugElement.injector.get(Router);
  page = new EditPage(fixture);
  fixture.detectChanges();
  routerLinkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
  routerLinks = routerLinkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
}
