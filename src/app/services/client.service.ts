import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject }    from 'rxjs/Subject';

import { Client } from '../models/client';

@Injectable()
export class ClientService {

  private clientDataSource = new Subject<Client[]>();
  clientDataStream = this.clientDataSource.asObservable();

  private uri = {
    clientData: '/assets/clients.json'
  };

  private clientDataJson: Client[] = [];
  private currentFilteredList: Client[] = [];

  constructor(
    private http: HttpService
  ) { }

  setLocalClientData(clientsJson: Client[]) {
    if (clientsJson) {
      this.clientDataJson = clientsJson;
    }
  }

  loadAllClientData() {
    return this.http.request(this.uri.clientData);
  }

  startLoadingClients() {
    this.http.request(this.uri.clientData)
      .subscribe(
        (response: Client[]) => {
          this.clientDataJson = response;
          this.currentFilteredList = this.clientDataJson;
          this.clientDataSource.next(response);
        } 
      );    
  }

  getAllClientsList() {
    return this.clientDataJson;
  }

  getClient(clientId: string): Client {
    if (clientId) {
      return this.clientDataJson.find(
        client => {
          return client.contact.email === clientId;
        }
      );
    }
  }

  filterClients(filterQuery: string) {

    let filterQueryParams: string[] = filterQuery.trim().replace(/\s+/g, ' ').split(' ');

    let filteredList: Client[] = [];

    filterQueryParams.forEach(
      param => {
        filteredList = this.currentFilteredList.filter(
          client => {
            return this.ClientIncludes(client, param);
          }
        );
        if (filteredList) {
          this.currentFilteredList = filteredList;
        }
      }
    );

    this.clientDataSource.next(filteredList);
    
    this.currentFilteredList = this.clientDataJson;
  }

  private ClientIncludes(client: Client, filter: string): boolean {
    return this.GeneralIncludes(client, filter) || 
           this.JobIncludes(client, filter) ||
           this.ContactIncludes(client, filter) ||
           this.AddressIncludes(client, filter)
  }

  private GeneralIncludes(client: Client, filter: string): boolean {
    return client.general.firstName.toLowerCase().includes(filter) || client.general.lastName.toLowerCase().includes(filter);
  } 

  private JobIncludes(client: Client, filter: string): boolean {
    return client.job.company.toLowerCase().includes(filter) || client.job.title.toLowerCase().includes(filter);
  }

  private ContactIncludes(client: Client, filter: string): boolean {
    return client.contact.email.toLowerCase().includes(filter) || client.contact.phone.toLowerCase().includes(filter);
  }

  private AddressIncludes(client: Client, filter: string): boolean {
    return client.address.city.toLowerCase().includes(filter) || 
           client.address.country.toLowerCase().includes(filter) || 
           client.address.street.toLowerCase().includes(filter) || 
           client.address.zipCode.toLowerCase().includes(filter);
  }

}
