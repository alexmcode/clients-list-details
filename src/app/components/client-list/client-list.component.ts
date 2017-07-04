import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  allClientsList: Client[] = [];

  constructor(
    private clientService: ClientService
  ) {
    this.clientService.clientDataStream
      .subscribe(
        (clients: Client[]) => {
          this.allClientsList = clients;      
        }
      );
  }

  onChange(data) {
    this.clientService.filterClients(data.toLowerCase());
  }

  ngOnInit() {
  }

}
