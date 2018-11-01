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
import { ClientsService } from '../../../services/clients.service';
import { FeaturesService } from '../../../services/features.service';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: string;
  client: Client;
  features: GridDataResult;
  state: DataSourceRequestState;
  selectable: SelectableSettings;
  pageable: PagerSettings;
  sortable: SortSettings;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly featuresService: FeaturesService,
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
    this.client = this.route.snapshot.data['client'] as Client;
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  edit(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientsService
      .edit(this.client)
      .subscribe(
        () => this.router.navigate([`/Clients/Details/${this.client.id}`]),
        (error: string) => this.error = error);
  }

  rowSelected = (row: RowArgs): boolean => this.client.clientFeatures.some(clientFeature => clientFeature.model2Id === row.dataItem.id);

  rowClass = (row: RowArgs): string => row.dataItem.isCore ? 'k-state-disabled' : '';

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.featuresService
      .index(state)
      .subscribe(
        (result: GridDataResult) => this.features = result,
        (error: string) => this.error = error);
  }

  selectionChange(event: SelectionEvent): void {
    if (event.selectedRows.length > 0) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      event.selectedRows.forEach(row => this.client.clientFeatures.push({
        model1Id: this.client.id,
        model1Name: this.client.name,
        model2Id: row.dataItem.id,
        model2Name: row.dataItem.name,
        expirationDate: expirationDate
      }));
    }
    if (event.deselectedRows.length > 0) {
      event.deselectedRows.filter(row => !row.dataItem.isCore).forEach(row => {
        const index = this.client.clientFeatures.findIndex(clientFeature => clientFeature.model2Id === row.dataItem.id);
        this.client.clientFeatures.splice(index, 1);
      });
    }
  }
}
