import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  private subscription: Subscription;
  private clientId: string = '';
  selectedClient: Client;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.clientId = params['clientId'];
          this.selectedClient = this.clientService.getClient(this.clientId);
          if (!this.selectedClient) {
            this.clientId = '';
          }
        }
      );
  }

}
