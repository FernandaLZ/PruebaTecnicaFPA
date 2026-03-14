import { FormControl } from '@angular/forms';
export interface ClientResponse {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address;
  phone:    string;
  website:  string;
  company:  Company;
}

export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}
export interface ClientDashboardPageData {
  id:       number;
  name:     string;
  email:    string;
  phone?:    string;
  creationDate: string;
}

export interface AddClientForm{
  name: FormControl<string>;
  email: FormControl<string>;
  phone?: FormControl<string | null>;
}
export interface AddClientResponse{
  name: string;
  email: string;
  phone?: string;
}
