import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Feature } from '../../models/feature';

@Component({
  selector: 'app-features-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  features = new Array<Feature>();

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.features = this.route.snapshot.data['features'] as Array<Feature>;
  }
}
