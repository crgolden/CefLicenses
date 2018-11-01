import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeaturesService } from '../../../services/features.service';
import { Feature } from '../../../models/feature';

@Component({
  selector: 'app-feature-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  error: string;
  feature: Feature;

  constructor(
    private readonly featuresService: FeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.feature = this.route.snapshot.data['feature'] as Feature;
  }

  delete(): void {
    this.featuresService
      .delete(this.feature.id)
      .subscribe(
        () => this.router.navigate(['/Features']),
        (error: string) => this.error = error);
  }
}
