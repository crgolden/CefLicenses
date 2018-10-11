import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';

import { FeaturesService } from '../../services/features.service';

@Component({
  selector: 'app-features-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  features: GridDataResult;
  state = {
    skip: 0,
    take: 5
  } as DataSourceRequestState;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly featuresService: FeaturesService) {
  }

  ngOnInit(): void {
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.featuresService.index(state).subscribe(r => this.features = r);
  }
}
