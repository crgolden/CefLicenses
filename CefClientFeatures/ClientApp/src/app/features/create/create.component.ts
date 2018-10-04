import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FeaturesService } from '../features.service';
import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  errors = '';
  model = new Feature();

  constructor(
    private readonly featuresService: FeaturesService,
    private readonly router: Router) {
  }

  create(valid: boolean) {
    if (!valid) {
      return;
    }
    this.featuresService
      .create(this.model)
      .subscribe(
        (feature: string | Feature) => {
          if (typeof feature !== 'string') {
            this.router.navigate([`/Features/Details/${feature.id}`]);
          }
        },
        (error: string) => this.errors = error);
  }
}
