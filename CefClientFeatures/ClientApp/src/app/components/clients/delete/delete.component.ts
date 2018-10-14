import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  error: string;
  client: Client;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'] as Client;
  }

  delete(): void {
    this.clientsService
      .delete(this.client.Id)
      .subscribe(
        () => this.router.navigate(['/Clients']),
        (error: string) => this.error = error);
  }
}
