import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService } from '../clients.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  errors = '';
  model = new Client();

  constructor(
    private readonly clientsService: ClientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.model = this.route.snapshot.data['client'] as Client;
  }

  edit(valid: boolean): void {
    if (!valid) {
      return;
    }
    this.clientsService
      .edit(this.model)
      .subscribe(
        () => this.router.navigate([`/Clients/Details/${this.model.id}`]),
        (error: string) => this.errors = error);
  }
}
