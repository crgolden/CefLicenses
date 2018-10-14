import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GridDataResult,
  PagerSettings,
  SortSettings
} from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-clients-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  error: string;
  clients: GridDataResult;
  state: DataSourceRequestState;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientsService: ClientsService) {
    this.state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'Name',
          dir: 'asc'
        }
      ] as SortDescriptor[]
    } as DataSourceRequestState;
    this.pageable = {
      buttonCount: 3
    } as PagerSettings;
    this.sortable = {
      allowUnsort: false,
      mode: 'single'
    } as SortSettings;
  }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'] as GridDataResult;
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.clientsService
      .index(state)
      .subscribe(
        (result: GridDataResult) => this.clients = result,
        (error: string) => this.error = error);
  }
}
