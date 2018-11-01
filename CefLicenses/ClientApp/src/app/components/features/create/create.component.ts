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
  styleUrls: ['./create.component.scss']
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
      clientFeatures: new Array<ClientFeature>()
    } as Feature;
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
    this.selectable = {
      checkboxOnly: true,
      enabled: true,
      mode: 'multiple'
    } as SelectableSettings;
    this.pageable = {
      buttonCount: 1,
      type: 'numeric',
      info: false,
      previousNext: true
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
        (feature: Feature) => this.router.navigate([`/Features/Details/${feature.id}`]),
        (error: string) => this.error = error);
  }

  /* tslint:disable-next-line:max-line-length */
  rowSelected = (row: RowArgs): boolean => this.feature.isCore || this.feature.clientFeatures.some(clientFeature => clientFeature.model1Id === row.dataItem.id);

  rowClass = (): string => this.feature.isCore ? 'k-state-disabled' : '';

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
      event.selectedRows.forEach(row => this.feature.clientFeatures.push({
        model1Id: row.dataItem.id,
        model1Name: row.dataItem.name,
        model2Id: this.feature.id,
        model2Name: this.feature.name,
        expirationDate: expirationDate
      } as ClientFeature));
    }
    if (!this.feature.isCore && event.deselectedRows.length > 0) {
      event.deselectedRows.forEach(row => {
        const index = this.feature.clientFeatures.findIndex(clientFeature => clientFeature.model1Id === row.dataItem.id);
        this.feature.clientFeatures.splice(index, 1);
      });
    }
  }
}
