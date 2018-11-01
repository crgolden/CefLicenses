import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GridDataResult,
  PagerSettings,
  SortSettings
} from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor,
  orderBy,
} from '@progress/kendo-data-query';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  error: string;
  client: Client;
  clientFeatures: GridDataResult;
  state: DataSourceRequestState;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(private readonly route: ActivatedRoute) {
    this.state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'model2Name',
          dir: 'asc'
        }
      ] as SortDescriptor[]
    } as DataSourceRequestState;
    this.pageable = {
      buttonCount: 1,
      type: 'numeric',
      info: false,
      previousNext: true
    } as PagerSettings;
    this.sortable = {
      allowUnsort: false,
      mode: 'single'
    } as SortSettings;
  }

  ngOnInit(): void {
    this.client = this.route.snapshot.data['client'] as Client;
    this.setClientFeatures();
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.setClientFeatures();
  }

  private setClientFeatures() {
    const clientFeatures = orderBy(this.client.clientFeatures, this.state.sort);
    this.clientFeatures = {
      data: clientFeatures.splice(this.state.skip, this.state.take),
      total: this.client.clientFeatures.length
    } as GridDataResult;
  }
}
