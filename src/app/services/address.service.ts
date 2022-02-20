import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`/v1/address/country/`);
  }

  getStates(countryId: string) {
    return this.http.get(`/v1/address/country/${countryId}/states/`);
  }

  getCities(countryId: string, stateId: string) {
    return this.http.get(`/v1/address/country/${countryId}/states/${stateId}/cities`);
  }

  getDataBasedOnZipcode(countryId: string, zipcode: number) {
    return this.http.get(`/v1/address/country/${countryId}/zipcode/${zipcode}`);
  }
}
