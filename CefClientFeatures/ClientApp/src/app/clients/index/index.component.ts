import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';

import { ClientsService } from '../../services/clients.service';

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
    this.clients = this.route.snapshot.data['clients'] as GridDataResult;
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.clientsService.index(state).subscribe(r => this.clients = r);
  }
}
