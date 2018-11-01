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
  styleUrls: ['./edit.component.scss']
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
        () => this.router.navigate([`/Features/Details/${this.feature.id}`]),
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
      }));
    }
    if (!this.feature.isCore && event.deselectedRows.length > 0) {
      event.deselectedRows.forEach(row => {
        const index = this.feature.clientFeatures.findIndex(clientFeature => clientFeature.model1Id === row.dataItem.id);
        this.feature.clientFeatures.splice(index, 1);
      });
    }
  }
}
