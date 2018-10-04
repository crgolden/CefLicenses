import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FeaturesService } from '../features.service';
import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  errors = '';
  model = new Feature();

  constructor(
    private readonly featuresService: FeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.model = this.route.snapshot.data['feature'] as Feature;
  }

  edit(valid: boolean) {
    if (!valid) {
      return;
    }
    this.featuresService
      .edit(this.model)
      .subscribe(
        () => this.router.navigate([`/Features/Details/${this.model.id}`]),
        (error: string) => this.errors = error);
  }
}
