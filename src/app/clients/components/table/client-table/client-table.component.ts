import {  RouterLink } from '@angular/router';
import { CLIENT_ROUTES } from './../../../../shared/routes/clients/routes';
import { ClientDashboardPageData } from './../../../interfaces/client-interfaces';
import { Component, input } from '@angular/core';
import { CreationDateClientPipe } from '../../../pipes/creation-date-client.pipe';
@Component({
  selector: 'client-table',
  imports: [RouterLink, CreationDateClientPipe],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  CLIENT_ROUTES = CLIENT_ROUTES;
  filteredClients = input.required<ClientDashboardPageData[]>();
}
