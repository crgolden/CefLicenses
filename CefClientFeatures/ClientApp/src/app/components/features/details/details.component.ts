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
  orderBy
} from '@progress/kendo-data-query';
import { Feature } from '../../../models/feature';

@Component({
  selector: 'app-feature-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  error: string;
  feature: Feature;
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
          field: 'Model1Name',
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
    this.feature = this.route.snapshot.data['feature'] as Feature;
    this.setClientFeatures();
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.setClientFeatures();
  }

  private setClientFeatures() {
    const clientFeatures = orderBy(this.feature.ClientFeatures, this.state.sort);
    this.clientFeatures = {
      data: clientFeatures.splice(this.state.skip, this.state.take),
      total: this.feature.ClientFeatures.length
    } as GridDataResult;
  }
}
