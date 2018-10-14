import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GridDataResult,
  SelectableSettings,
  PagerSettings,
  SortSettings,
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

@Component({
  selector: 'app-feature-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  error: string;
  feature: Feature;
  clients: GridDataResult;
  state: DataSourceRequestState;
  selectable: SelectableSettings;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(
    private readonly featuresService: FeaturesService,
    private readonly clientsService: ClientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
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
      buttonCount: 3
    } as PagerSettings;
    this.sortable = {
      allowUnsort: false,
      mode: 'single'
    } as SortSettings;
  }

  ngOnInit(): void {
    this.feature = this.route.snapshot.data['feature'] as Feature;
    this.clients = this.route.snapshot.data['clients'] as GridDataResult;
  }

  edit(form: NgForm) {
    if (!form.valid) { return; }
    this.featuresService
      .edit(this.feature)
      .subscribe(
        () => this.router.navigate([`/Features/Details/${this.feature.Id}`]),
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
