import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Client } from '../models/client';

import 'rxjs/Rx';


@Injectable()
export class HttpService {

  constructor(
    private http: Http
  ) { }

  private extractData(response: any) {
    if (response._body) {
      return response.json();
    }
    return
  }

  request(url: string, options?: RequestOptionsArgs): Observable<Client[]> {
    return this.http.request(url, options)
      .map( response => this.extractData(response));
  }

}
