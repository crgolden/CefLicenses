import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientFeaturesService } from '../../../services/client-features.service';
import { ClientFeature } from '../../../relationships/client-feature';

@Component({
  selector: 'app-client-feature-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  error: string;
  clientFeature: ClientFeature;

  constructor(
    private readonly clientFeaturesService: ClientFeaturesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clientFeature = this.route.snapshot.data['clientFeature'] as ClientFeature;
  }

  delete(): void {
    this.clientFeaturesService
      .delete(this.clientFeature.Model1Id, this.clientFeature.Model2Id)
      .subscribe(
        () => this.router.navigate(['/ClientFeatures']),
        (error: string) => this.error = error);
  }
}
