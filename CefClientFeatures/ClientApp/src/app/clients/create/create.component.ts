import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  errors = '';
  model = new Client();

  constructor(
    private readonly clientsService: ClientsService,
    private readonly router: Router) {
  }

  create(valid: boolean): void {
    if (!valid) {
      return;
    }
    this.clientsService
      .create(this.model)
      .subscribe(
        (client: Client) => this.router.navigate([`/Clients/Details/${client.id}`]),
        (error: string) => this.errors = error);
  }
}
