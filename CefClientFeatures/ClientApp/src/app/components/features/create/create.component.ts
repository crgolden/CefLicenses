import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GridDataResult,
  SelectableSettings,
  PagerSettings,
  RowArgs,
  SelectionEvent
} from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { FeaturesService } from '../../../services/features.service';
import { ClientsService } from '../../../services/clients.service';
import { Feature } from '../../../models/feature';
import { ClientFeature } from '../../../relationships/client-feature';

@Component({
  selector: 'app-feature-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  error: string;
  feature: Feature;
  clients: GridDataResult;
  state: DataSourceRequestState;
  selectable: SelectableSettings;
  pageable: PagerSettings;

  constructor(
    private readonly featuresService: FeaturesService,
    private readonly clientsService: ClientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
    this.feature = {
      ClientFeatures: new Array<ClientFeature>()
    } as Feature;
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
    this.selectable = {
      checkboxOnly: true,
      enabled: true,
      mode: 'multiple'
    } as SelectableSettings;
    this.pageable = {
      buttonCount: 3,
    } as PagerSettings;
  }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'] as GridDataResult;
  }

  create(form: NgForm): void {
    if (!form.valid) { return; }
    this.featuresService
      .create(this.feature)
      .subscribe(
        (feature: Feature) => this.router.navigate([`/Features/Details/${feature.Id}`]),
        (error: string) => this.error = error);
  }

  /* tslint:disable-next-line:max-line-length */
  rowSelected = (row: RowArgs): boolean => this.feature.IsCore || this.feature.ClientFeatures.some(clientFeature => clientFeature.Model1Id === row.dataItem.Id);

  rowClass = (): string => this.feature.IsCore ? 'k-state-disabled' : '';

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.clientsService
      .index(state)
      .subscribe(
        (result: GridDataResult) => this.clients = result,
        (error: string) => this.error = error);
  }

  selectionChange(event: SelectionEvent): void {
    if (event.selectedRows.length > 0) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      event.selectedRows.forEach(row => this.feature.ClientFeatures.push({
        Model1Id: row.dataItem.Id,
        Model1Name: row.dataItem.Name,
        Model2Id: this.feature.Id,
        Model2Name: this.feature.Name,
        ExpirationDate: expirationDate
      }));
    }
    if (!this.feature.IsCore && event.deselectedRows.length > 0) {
      event.deselectedRows.forEach(row => {
        const index = this.feature.ClientFeatures.findIndex(clientFeature => clientFeature.Model1Id === row.dataItem.Id);
        this.feature.ClientFeatures.splice(index, 1);
      });
    }
  }
}
