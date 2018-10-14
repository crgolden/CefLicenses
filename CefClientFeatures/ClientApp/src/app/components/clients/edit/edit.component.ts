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
  styleUrls: ['./edit.component.css']
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
    this.client = this.route.snapshot.data['client'] as Client;
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  edit(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientsService
      .edit(this.client)
      .subscribe(
        () => this.router.navigate([`/Clients/Details/${this.client.Id}`]),
        (error: string) => this.error = error);
  }

  rowSelected = (row: RowArgs): boolean => this.client.ClientFeatures.some(clientFeature => clientFeature.Model2Id === row.dataItem.Id);

  rowClass = (row: RowArgs): string => row.dataItem.IsCore ? 'k-state-disabled' : '';

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
      event.selectedRows.forEach(row => this.client.ClientFeatures.push({
        Model1Id: this.client.Id,
        Model1Name: this.client.Name,
        Model2Id: row.dataItem.Id,
        Model2Name: row.dataItem.Name,
        ExpirationDate: expirationDate
      }));
    }
    if (event.deselectedRows.length > 0) {
      event.deselectedRows.filter(row => !row.dataItem.IsCore).forEach(row => {
        const index = this.client.ClientFeatures.findIndex(clientFeature => clientFeature.Model2Id === row.dataItem.Id);
        this.client.ClientFeatures.splice(index, 1);
      });
    }
  }
}
