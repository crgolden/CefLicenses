import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DataSourceRequestState, DataResult } from '@progress/kendo-data-query';

import { Client } from '../../models/client';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  clients: GridDataResult;
  state = {
    skip: 0,
    take: 5
  } as DataSourceRequestState;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'];
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.clientsService.index(state)
      .subscribe(r => this.clients = r);
  }
}
