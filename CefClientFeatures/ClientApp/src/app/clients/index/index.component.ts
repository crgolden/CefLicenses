import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Client } from '../../models/client';

@Component({
  selector: 'app-clients-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  clients = new Array<Client>();

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clients = this.route.snapshot.data['clients'] as Array<Client>;
  }
}
