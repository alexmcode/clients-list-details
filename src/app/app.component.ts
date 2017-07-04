import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';

import { Client } from './models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private clientService: ClientService
  ) {
    this.clientService.startLoadingClients();    
  }

  ngOnInit() {
  }

}
