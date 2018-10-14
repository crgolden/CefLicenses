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
  styleUrls: ['./create.component.css']
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
        (clientFeature: ClientFeature) =>
          this.router.navigate([`/ClientFeatures/Details/${clientFeature.Model1Id}/${clientFeature.Model2Id}`]),
        (error: string) => this.error = error);
  }

  clientValueChange(): void {
    if (this.client.Name) {
      this.client = this.clients.filter(client => client.Name === this.client.Name)[0];
      this.features = this.features.filter(
        feature => !this.client.ClientFeatures.some(clientFeature => clientFeature.Model2Id === feature.Id));
      this.clientFeature.Model1Id = this.client.Id;
      this.clientFeature.Model1Name = this.client.Name;
    } else {
      this.client = new Client();
      this.features = this.allFeatures;
      this.clientFeature.Model1Id = undefined;
      this.clientFeature.Model1Name = undefined;
    }
  }

  featureValueChange(): void {
    if (this.feature.Name) {
      this.feature = this.features.filter(feature => feature.Name === this.feature.Name)[0];
      this.clients = this.clients.filter(
        client => !this.feature.ClientFeatures.some(clientFeature => clientFeature.Model1Id === client.Id));
      this.clientFeature.Model2Id = this.feature.Id;
      this.clientFeature.Model2Name = this.feature.Name;
    } else {
      this.feature = new Feature();
      this.clients = this.allClients;
      this.clientFeature.Model2Id = undefined;
      this.clientFeature.Model2Name = undefined;
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
