import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService } from '../clients.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

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

  delete() {
    this.clientsService
      .delete(this.model.id)
      .subscribe(
        () => this.router.navigate(['/Clients']),
        (error: string) => this.errors = error);
  }
}