import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../model/city.model';
import { Bank } from '../model/bank.model';
@Injectable()
export class MainService {

  bankApiUrl = 'https://vast-shore-74260.herokuapp.com/banks';
  constructor(
    public http: HttpClient
  ) { }
  public getCities() {
    return this.http.get<City[]>('./assets/data/city.json');
  }

  public getBanks(city: string) {
    return this.http.get<Bank[]>(this.bankApiUrl + '?city=' + city.toUpperCase());
  }

}
