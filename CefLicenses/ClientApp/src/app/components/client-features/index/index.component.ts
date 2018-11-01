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
import { ClientFeaturesService } from '../../../services/client-features.service';

@Component({
  selector: 'app-client-features-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  error: string;
  clientFeatures: GridDataResult;
  state: DataSourceRequestState;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly clientFeaturesService: ClientFeaturesService) {
    this.state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'model1Name',
          dir: 'asc'
        },
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
      allowUnsort: true,
      mode: 'multiple',
      showIndexes: true
    } as SortSettings;
  }

  ngOnInit(): void {
    this.clientFeatures = this.route.snapshot.data['clientFeatures'] as GridDataResult;
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.clientFeaturesService
      .index(state)
      .subscribe(
        (result: GridDataResult) => this.clientFeatures = result,
        (error: string) => this.error = error);
  }
}
