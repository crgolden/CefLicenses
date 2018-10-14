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
import { ClientsService } from '../../../services/clients.service';
import { FeaturesService } from '../../../services/features.service';
import { Client } from '../../../models/client';
import { ClientFeature } from '../../../relationships/client-feature';

@Component({
  selector: 'app-client-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  error: string;
  client: Client;
  features: GridDataResult;
  state: DataSourceRequestState;
  selectableSettings: SelectableSettings;
  pageable: PagerSettings;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly featuresService: FeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
    this.client = {
      ClientFeatures: new Array<ClientFeature>()
    } as Client;
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
    this.selectableSettings = {
      checkboxOnly: true,
      enabled: true,
      mode: 'multiple'
    } as SelectableSettings;
    this.pageable = {
      buttonCount: 3,
    } as PagerSettings;
  }

  ngOnInit(): void {
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  create(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientsService
      .create(this.client)
      .subscribe(
        (client: Client) => this.router.navigate([`/Clients/Details/${client.Id}`]),
        (error: string) => this.error = error);
  }

  /* tslint:disable-next-line:max-line-length */
  rowSelected = (row: RowArgs): boolean => row.dataItem.IsCore || this.client.ClientFeatures.some(clientFeature => clientFeature.Model2Id === row.dataItem.Id);

  rowClass = (row: RowArgs): string => row.dataItem.IsCore ? 'k-state-disabled' : '';

  dataStateChange(state: DataSourceRequestState): void {
    this.state = state;
    this.featuresService.index(state)
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
    if (event.deselectedRows.filter(row => !row.dataItem.IsCore).length > 0) {
      event.deselectedRows.filter(row => !row.dataItem.IsCore).forEach(row => {
        const index = this.client.ClientFeatures.findIndex(clientFeature => clientFeature.Model2Id === row.dataItem.Id);
        this.client.ClientFeatures.splice(index, 1);
      });
    }
  }
}
