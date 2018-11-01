import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientFeaturesService } from '../../../services/client-features.service';
import { ClientFeature } from '../../../relationships/client-feature';

@Component({
  selector: 'app-client-feature-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  error: string;
  clientFeature: ClientFeature;

  constructor(
    private readonly clientFeaturesService: ClientFeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clientFeature = this.route.snapshot.data['clientFeature'] as ClientFeature;
    this.clientFeature.expirationDate = new Date(this.clientFeature.expirationDate);
  }

  edit(form: NgForm): void {
    if (!form.valid) { return; }
    this.clientFeaturesService
      .edit(this.clientFeature)
      .subscribe(
        () => this.router.navigate([`/ClientFeatures/Details/${this.clientFeature.model1Id}/${this.clientFeature.model2Id}`]),
        (error: string) => this.error = error);
  }
}
