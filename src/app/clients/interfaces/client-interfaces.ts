import { FormControl } from '@angular/forms';

//Interfaces for clients http requests
export interface ClientResponse {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

//Interface for client dashboard page
export interface ClientDashboardPageData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  creationDate: string;
}

//Interface for add client form
export interface AddClientForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone?: FormControl<string | null>;
}

//Interface return by add client
export interface AddClientResponse {
  name: string;
  email: string;
  phone?: string;
}

//Interface for client details page
export interface ClientResponseEXT extends ClientResponse {
  creationDate: string;
}

//Interface for notes
export interface Note {
  userId: number;
  id: number;
  title: string;
  body?: string;
}
