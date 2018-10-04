import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  model = new Feature();

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.model = this.route.snapshot.data['feature'] as Feature;
  }
}
