import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FeaturesService } from '../../services/features.service';
import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

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

  delete(): void {
    this.featuresService
      .delete(this.model.Id)
      .subscribe(
        () => this.router.navigate(['/Features']),
        (error: string) => this.errors = error);
  }
}
