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
import { FeaturesService } from '../../../services/features.service';

@Component({
  selector: 'app-features-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  error: string;
  features: GridDataResult;
  state: DataSourceRequestState;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly featuresService: FeaturesService) {
    this.state = {
      skip: 0,
      take: 5,
      sort: [
        {
          field: 'name',
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
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.featuresService
      .index(state)
      .subscribe(
        (result: GridDataResult) => this.features = result,
        (error: string) => this.error = error);
  }
}
