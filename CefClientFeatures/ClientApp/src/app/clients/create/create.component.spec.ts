import { } from 'jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterLinkDirectiveStub } from '../../../test/router-link-directive-stub';
import { CreatePage } from '../../../test/page-models/clients/create-page';
import { CreateComponent } from './create.component';
import { ClientsService } from '../clients.service';
import { of } from 'rxjs';

let component: CreateComponent;
let fixture: ComponentFixture<CreateComponent>;
let page: CreatePage;
let routerLinks: RouterLinkDirectiveStub[];
let routerLinkDebugElements: DebugElement[];
let clientsService: ClientsService;
let router: Router;

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('CreateComponent', () => {

  beforeEach(() => setup());

  it('should have a new client', () => {
    expect(component.model.id).toBeUndefined();
    expect(component.model.name).toBeUndefined();
  });

  it('should display blank inputs', () => {
    return fixture.whenStable().then(() => {
      expect(page.name.value).toBe('');
    });
  });

  it('should call create and navigate on submit', () => {
    component.create(true);
    expect(clientsService.create).toHaveBeenCalled();
    // expect(router.navigateByUrl).toHaveBeenCalled();
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
        provide: ClientsService,
        useValue: jasmine.createSpyObj('ClientsService', { create: of() })
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
