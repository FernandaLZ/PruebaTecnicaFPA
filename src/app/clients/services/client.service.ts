import { Injectable, effect, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  AddClientResponse,
  ClientDashboardPageData,
  ClientResponse,
} from '../interfaces/client-interfaces';
import { delay, map, Observable, of, repeat, take, tap } from 'rxjs';
import { ClientMapper } from '../mapper/client-mapper';

const CLIENT_KEY = 'clients';

const loadFromLocalStorage = (): ClientDashboardPageData[] => {
  const clientsFromLocalStorage = localStorage.getItem(CLIENT_KEY) ?? '[]';
  return JSON.parse(clientsFromLocalStorage);
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  limit = signal(10);
  pages = signal(0);

  private clientsCache = signal<ClientDashboardPageData[]>(
    loadFromLocalStorage(),
  );
  private clientsResponse = signal<ClientDashboardPageData[]>([]);

  clientsDashboard = computed(() => {
    return [...this.clientsCache(), ...this.clientsResponse()];
  });

  saveClientsToLocalStorage = effect(() => {
    const clientJSON = JSON.stringify(this.clientsCache());
    localStorage.setItem(CLIENT_KEY, clientJSON);
  });

  //HTTP request to load clients
  loadClients(page: number): Observable<ClientDashboardPageData[]> {
    return this.http
      .get<ClientResponse[]>(`${environment.jsonPlaceHolderUrl}/users`)
      .pipe(
        map(ClientMapper.mapClientsResponseToDashboard),
        tap((clients) => {
          this.clientsResponse.set(clients);
          this.calculatePages();
        }),
        map(() => this.getPage(page)),
        //Show skeleton loader
        delay(1000),
      );
  }
  //Get clients for the current page
  getPage(page: number): ClientDashboardPageData[] {
    const start = (page - 1) * this.limit();
    return this.clientsDashboard().slice(start, start + this.limit());
  }

  //HTTP request to add client
  addClient(client: AddClientResponse): Observable<boolean> {
    return this.http.post<boolean>(`${environment.jsonPlaceHolderUrl}/users`, client)
  }

  //Add client to cache
  addClientToCache(client: AddClientResponse) {
    this.clientsCache.update((clients) => {
      const newClient: ClientDashboardPageData = {
        id: clients.length + this.clientsResponse().length + 1,
        name: client.name,
        email: client.email,
        phone: client.phone,
        creationDate: Date.now().toString(),
      };
      return [newClient, ...clients];
    });
    this.calculatePages();
  }

  private calculatePages() {
    const total = this.clientsDashboard().length;
    const limit = this.limit();
    this.pages.set(Math.ceil(total / limit));
  }


}
