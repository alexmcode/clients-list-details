import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ClientDetailsComponent } from './client-details.component';

export const CLIENT_DETAILS_ROUTES: Routes = [
  { path: '', component: ClientDetailsComponent },
  { path: ':clientId', component: ClientDetailsComponent }
];

export const clientDetailsRouting = RouterModule.forRoot(CLIENT_DETAILS_ROUTES);