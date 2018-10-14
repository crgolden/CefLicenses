import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientFeature } from '../../../relationships/client-feature';

@Component({
  selector: 'app-client-feature-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  clientFeature: ClientFeature;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clientFeature = this.route.snapshot.data['clientFeature'] as ClientFeature;
  }
}
