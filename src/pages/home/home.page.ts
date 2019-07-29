import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { City } from '../../model/city.model';
import { Bank } from '../../model/bank.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // providers:  [ MainService ]
})
export class HomePage implements OnInit {

  public cityList: City[];
  public selectedCity: string;
  public bankList: Bank[] = [];
  public allBankList: Bank[] = [];
  public loadingScreen = false;
  public searchText: string;
  constructor(
    private mainService: MainService
  ) {
    mainService.getCities()
    .subscribe((res) => {
      this.cityList = res;
    });
  }

  public onCityChange() {
    // console.log('City', this.selectedCity);
    this.loadingScreen = true;
    this.mainService.getBanks(this.selectedCity)
    .subscribe((res) => {
      this.bankList = res;
      this.allBankList = res;
      this.loadingScreen = false;
    });
  }

  public getAddress(bank: Bank) {
    return bank.address + " " + bank.state;
  }

  public searchBank() {
    this.bankList = this.allBankList.filter((res) => res.ifsc === this.searchText );
  }

}
