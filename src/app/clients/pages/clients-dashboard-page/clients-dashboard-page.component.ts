import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AddClientComponent } from '../../components/add-client/add-client.component';
import {
  AddClientForm,
  AddClientResponse,
} from '../../interfaces/client-interfaces';
import { ClientService } from '../../services/client.service';
import { Component, computed, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkeletonTableComponent } from '../../../shared/components/skeleton-table/skeleton-table.component';
import { ClientTableComponent } from '../../components/table/client-table/client-table.component';

@Component({
  selector: 'app-clients-dashboard-page',
  imports: [
    FaIconComponent,
    PaginationComponent,
    SkeletonTableComponent,
    ClientTableComponent,
  ],
  templateUrl: './clients-dashboard-page.component.html',
  styleUrl: './clients-dashboard-page.component.scss',
})
export default class ClientsDashboardPageComponent {
  //Services and dependencies
  readonly clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  router = inject(Router);

  //Params
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('page')) || 1),
    ),
    { initialValue: 1 },
  );

  //Icons
  faMagnifyingGlass = faMagnifyingGlass;

  //Signals
  searchControl = signal('');

  filteredClients = computed(() =>
    this.clientService.getFilteredClients(
      this.currentPage(),
      this.searchControl(),
    ),
  );

  pages = computed(() =>
    this.clientService.getTotalPages(this.searchControl()),
  );

  //Petition
  clientResource = rxResource({
    request: () => ({ page: this.currentPage() }),
    loader: ({ request }) => this.clientService.loadClients(),
  });

  //Add client method
  addClient() {
    const dialogRef = this.dialog.open(AddClientComponent);
    dialogRef.afterClosed().subscribe((result: AddClientForm) => {
      if (result !== undefined) {
        this.clientService.addClient(result).subscribe({
          next: (response: AddClientResponse) => {
            this.clientService.addClientToCache(response);
          },
          error: (err) => console.error('Error adding client:', err),
        });
      }
    });
  }
}
