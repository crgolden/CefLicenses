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
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  error: string;
  client: Client;
  features: GridDataResult;
  state: DataSourceRequestState;
  selectable: SelectableSettings;
  pageable: PagerSettings;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly featuresService: FeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
    this.client = {
      clientFeatures: new Array<ClientFeature>()
    } as Client;
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
    this.features = this.route.snapshot.data['features'] as GridDataResult;
  }

  create(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientsService
      .create(this.client)
      .subscribe(
        (client: Client) => this.router.navigate([`/Clients/Details/${client.id}`]),
        (error: string) => this.error = error);
  }

  /* tslint:disable-next-line:max-line-length */
  rowSelected = (row: RowArgs): boolean => row.dataItem.isCore || this.client.clientFeatures.some(clientFeature => clientFeature.model2Id === row.dataItem.id);

  rowClass = (row: RowArgs): string => row.dataItem.isCore ? 'k-state-disabled' : '';

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
      event.selectedRows.forEach(row => this.client.clientFeatures.push({
        model1Id: this.client.id,
        model1Name: this.client.name,
        model2Id: row.dataItem.id,
        model2Name: row.dataItem.name,
        expirationDate: expirationDate
      } as ClientFeature));
    }
    if (event.deselectedRows.filter(row => !row.dataItem.isCore).length > 0) {
      event.deselectedRows.filter(row => !row.dataItem.isCore).forEach(row => {
        const index = this.client.clientFeatures.findIndex(clientFeature => clientFeature.model2Id === row.dataItem.id);
        this.client.clientFeatures.splice(index, 1);
      });
    }
  }
}
