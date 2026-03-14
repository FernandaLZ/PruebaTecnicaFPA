import {
  Injectable,
  effect,
  inject,
  signal,
  computed,
  getPlatform,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  AddClientForm,
  AddClientResponse,
  ClientDashboardPageData,
  ClientResponse,
  ClientResponseEXT,
  Note,
} from '../interfaces/client-interfaces';
import { delay, map, Observable, of, tap, throwError } from 'rxjs';
import { ClientMapper } from '../mapper/client-mapper';

const CLIENT_KEY = 'clients';

const loadFromLocalStorage = (): ClientDashboardPageData[] => {
  const clientsFromLocalStorage = localStorage.getItem(CLIENT_KEY) ?? '[]';
  return JSON.parse(clientsFromLocalStorage);
};
const loadFromLocalStorageNotes = (): Record<number, Note[]> => {
  const notesFromLocalStorage = localStorage.getItem(NOTE_KEY) ?? '{}';
  return JSON.parse(notesFromLocalStorage);
};

const NOTE_KEY = 'notes';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  //Dependencies
  private http = inject(HttpClient);

  //Constants
  limit = signal(10);
  pages = signal(0);

  //Client data
  clientsCache = signal<ClientDashboardPageData[]>(loadFromLocalStorage());

  //Notes data
  noteByClientCache = signal<Record<number, Note[]>>(
    loadFromLocalStorageNotes(),
  );

  //Local storage
  saveClientsToLocalStorage = effect(() => {
    const clientJSON = JSON.stringify(this.clientsCache());
    localStorage.setItem(CLIENT_KEY, clientJSON);
  });

  saveNotesToLocalStorage = effect(() => {
    const noteJSON = JSON.stringify(this.noteByClientCache());
    localStorage.setItem(NOTE_KEY, noteJSON);
  });

  // HTTP REQUESTS

  //HTTP get clients
  loadClients(): Observable<ClientDashboardPageData[]> {
    if (this.clientsCache().length > 0) {
      return of(this.clientsCache());
    } else {
      return this.http
        .get<ClientResponse[]>(`${environment.jsonPlaceHolderUrl}/users`)
        .pipe(
          map(ClientMapper.mapClientsResponseToDashboard),
          tap((clients) => {
            this.clientsCache.set(clients);
          }),
          //Show skeleton loader
          delay(1000),
        );
    }
  }

  //HTTP request to add client
  addClient(client: AddClientForm): Observable<AddClientResponse> {
    return this.http.post<AddClientResponse>(
      `${environment.jsonPlaceHolderUrl}/users`,
      client,
    );
  }

  //HTTP request to get client by id
  getClientById(id: number): Observable<ClientResponseEXT> {
    return this.http
      .get<ClientResponse>(`${environment.jsonPlaceHolderUrl}/users/${id}`)
      .pipe(
        map((clientFromApi) => {
          let clientFromDashboard = this.clientsCache().find(
            (c) => c.id === clientFromApi.id,
          );
          return {
            ...clientFromApi,
            creationDate: clientFromDashboard
              ? clientFromDashboard.creationDate
              : new Date().toISOString(),
          };
        }),
      );
  }

  //HTTP requests for notes
  getNotesByClientId(clientId: number): Observable<Note[]> {
    if (this.noteByClientCache()[clientId]) {
      return of(this.noteByClientCache()[clientId]);
    } else {
      return this.http
        .get<
          Note[]
        >(`${environment.jsonPlaceHolderUrl}/posts?userId=${clientId}`)
        .pipe(
          tap((notes) => {
            this.noteByClientCache.update((cache) => ({
              ...cache,
              [clientId]: notes,
            }));
          }),
        );
    }
  }

  //HTTP request to delete note
  deleteNoteById(noteId: number, clientId: number): Observable<{}> {
    return this.http
      .delete<{}>(`${environment.jsonPlaceHolderUrl}/posts/${noteId}`)
      .pipe(
        tap(() => {
          this.noteByClientCache.update((cache) => ({
            ...cache,
            [clientId]: cache[clientId]?.filter((n) => n.id !== noteId) ?? [],
          }));
        }),
      );
  }

  //HTTP request to add note
  addNoteByClientId(note: string, clientId: number): Observable<Note> {
    const newNote: Omit<Note, 'id'> = {
      userId: clientId,
      title: note,
      body: '',
    };
    return this.http
      .post<Note>(`${environment.jsonPlaceHolderUrl}/posts`, newNote)
      .pipe(
        tap((createdNote) => {
          this.noteByClientCache.update((cache) => ({
            ...cache,
            [clientId]: [...(cache[clientId] ?? []), createdNote],
          }));
        }),
      );
  }

  //Get clients
  getClientsByPage(page: number): ClientDashboardPageData[] {
    const start = (page - 1) * this.limit();
    return this.clientsCache().slice(start, start + this.limit());
  }
  //Get client info
  getClient(id: number): Observable<ClientResponseEXT> {
    if (id <= 10) {
      return this.getClientById(id);
    } else {
      const clientFromDashboard = this.clientsCache().find(
        (c: ClientDashboardPageData) => c.id === id,
      );
      if (!clientFromDashboard) {
        return throwError(() => new Error('Client not found'));
      }
      return of({
        id: clientFromDashboard.id,
        name: clientFromDashboard.name,
        email: clientFromDashboard.email,
        phone: clientFromDashboard.phone,
        creationDate: clientFromDashboard.creationDate,
      });
    }
  }

  //Add client
  addClientToCache(client: AddClientResponse) {
    this.clientsCache.update((clients) => {
      const newClient: ClientDashboardPageData = {
        id: clients.length + 1,
        name: client.name,
        email: client.email,
        phone: client.phone,
        creationDate: new Date().toISOString(),
      };
      return [newClient, ...clients];
    });
  }

  //Methods
  private getFiltered(search: string): ClientDashboardPageData[] {
  if (!search) return this.clientsCache();
  return this.clientsCache().filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );
}

getTotalPages(search: string): number {
  return Math.ceil(this.getFiltered(search).length / this.limit());
}

getFilteredClients(page: number, search: string): ClientDashboardPageData[] {
  const filtered = this.getFiltered(search);
  const totalPages = Math.ceil(filtered.length / this.limit());

  const safePage = page > totalPages ? 1 : page;
  const start = (safePage - 1) * this.limit();
  return filtered.slice(start, start + this.limit());
}
}
