import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

import { HttpService } from './services/http.service';
import { ClientService } from './services/client.service';
import { ClientListItemComponent } from './components/client-list/client-list-item/client-list-item.component';
import { clientDetailsRouting } from './components/client-details/client-details.routes';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailsComponent,
    ClientListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    clientDetailsRouting
  ],
  providers: [
    HttpService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
