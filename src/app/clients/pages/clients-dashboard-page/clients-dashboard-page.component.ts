import { ActivatedRoute, ParamMap } from "@angular/router";
import { AddClientComponent } from "../../components/add-client/add-client.component";
import { AddClientResponse } from "../../interfaces/client-interfaces";
import { ClientService } from "../../services/client.service";
import { Component, computed, inject, signal } from "@angular/core";
import { CreationDateClientPipe } from "../../pipes/creation-date-client.pipe";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-clients-dashboard-page',
  imports: [FaIconComponent, PaginationComponent, CreationDateClientPipe],
  templateUrl: './clients-dashboard-page.component.html',
  styleUrl: './clients-dashboard-page.component.scss',
})
export default class ClientsDashboardPageComponent{
  faMagnifyingGlass = faMagnifyingGlass;
  readonly clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);

  searchControl = signal('');

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('page')) || 1)
    ),
    { initialValue: 1 }
  );
  clients = computed(() => this.clientService.getPage(this.currentPage()));

  filteredClients = computed(() => {
    const clients = this.clients();
    const search = this.searchControl().toLowerCase().trim();

    if (!search) return clients;

    return clients.filter(client =>
      client.name.toLowerCase().includes(search) ||
      client.email.toLowerCase().includes(search)
    );
  });
  clientResource = rxResource({
    request: () => ({ page: this.currentPage() }),
    loader: ({ request }) => this.clientService.loadClients(request.page)
  });
  addClient(){
    const dialogRef = this.dialog.open(AddClientComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.clientService.addClient(result).subscribe({
          next: (response) => {
            const newClient: AddClientResponse = {
              name: result.name,
              email: result.email,
              phone: result.phone
            };
            this.clientService.addClientToCache(newClient);
          },
          error: (err) => console.error('Error adding client:', err)
        })
      }
    });
  }

}
