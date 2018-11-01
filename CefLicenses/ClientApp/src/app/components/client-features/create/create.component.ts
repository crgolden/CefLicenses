import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
  DataSourceRequestState,
  SortDescriptor
} from '@progress/kendo-data-query';
import { ClientFeaturesService } from '../../../services/client-features.service';
import { ClientsService } from '../../../services/clients.service';
import { FeaturesService } from '../../../services/features.service';
import { ClientFeature } from '../../../relationships/client-feature';
import { Client } from '../../../models/client';
import { Feature } from '../../../models/feature';

@Component({
  selector: 'app-client-feature-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  error: string;
  clientFeature: ClientFeature;
  client: Client;
  clients: Array<Client>;
  allClients: Array<Client>;
  feature: Feature;
  features: Array<Feature>;
  allFeatures: Array<Feature>;

  constructor(
    private readonly clientFeaturesService: ClientFeaturesService,
    private readonly clientsService: ClientsService,
    private readonly featuresService: FeaturesService,
    private readonly router: Router) {
    this.clientFeature = new ClientFeature();
    this.client = new Client();
    this.feature = new Feature();
  }

  ngOnInit(): void {
    const state = {
      sort: [
        {
          field: 'Name',
          dir: 'asc'
        }
      ] as SortDescriptor[]
    } as DataSourceRequestState;
    this.setClients(state);
    this.setFeatures(state);
  }

  create(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientFeaturesService
      .create(this.clientFeature)
      .subscribe(
        /* tslint:disable-next-line:max-line-length */
        (clientFeature: ClientFeature) => this.router.navigate([`/ClientFeatures/Details/${clientFeature.model1Id}/${clientFeature.model2Id}`]),
        (error: string) => this.error = error);
  }

  clientValueChange(): void {
    let clients = new Array<Client>();
    if (this.client.name) {
      clients = this.clients.filter(client => client.name === this.client.name);
    }
    if (clients.length > 0) {
      this.client = { ...clients[0] };
      /* tslint:disable-next-line:max-line-length */
      this.features = this.features.filter(feature => !this.client.clientFeatures.some(clientFeature => clientFeature.model2Id === feature.id));
      this.clientFeature.model1Id = this.client.id;
      this.clientFeature.model1Name = this.client.name;
    } else {
      this.client = new Client();
      this.features = this.allFeatures;
      this.clientFeature.model1Id = undefined;
      this.clientFeature.model1Name = undefined;
    }
  }

  featureValueChange(): void {
    let features = new Array<Feature>();
    if (this.feature.name) {
      features = this.features.filter(feature => feature.name === this.feature.name);
    }
    if (features.length > 0) {
      this.feature = { ...features[0] };
      /* tslint:disable-next-line:max-line-length */
      this.clients = this.clients.filter(client => !this.feature.clientFeatures.some(clientFeature => clientFeature.model1Id === client.id));
      this.clientFeature.model2Id = this.feature.id;
      this.clientFeature.model2Name = this.feature.name;
    } else {
      this.feature = new Feature();
      this.clients = this.allClients;
      this.clientFeature.model2Id = undefined;
      this.clientFeature.model2Name = undefined;
    }
  }

  private setClients(state: DataSourceRequestState): void {
    this.clientsService
      .index(state)
      .subscribe(
        (result: GridDataResult) => {
          this.clients = result.data;
          this.allClients = result.data;
        },
        (error: string) => this.error = error);
  }

  private setFeatures(state: DataSourceRequestState): void {
    this.featuresService
      .index(state)
      .subscribe(
        (result: GridDataResult) => {
          this.features = result.data;
          this.allFeatures = result.data;
        },
        (error: string) => this.error = error);
  }
}
