import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MainService } from '../../services/main.service';
import { City } from '../../model/city.model';
import { Bank } from '../../model/bank.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // providers:  [ MainService ]
})
export class HomePage {

  public cityList: City[];
  public selectedCity: string;
  public bankList: Bank[] = [];
  public allBankList: Bank[] = [];
  public loadingScreen = false;
  public searchText: string;
  public isCityListDisabled = false;
  public isSearchBoxDisabled = true;
  constructor(
    private mainService: MainService,
    public toastController: ToastController
  ) {
    mainService.getCities()
    .subscribe((res) => {
      this.cityList = res;
    },
    (error) => {
      this.presentToast(error.message);
    });
  }

  public onCityChange() {
    // console.log('City', this.selectedCity);
    this.loadingScreen = true;
    this.allBankList = [];
    this.bankList = [];
    this.searchText = '';
    this.isCityListDisabled = true;
    this.mainService.getBanks(this.selectedCity)
    .subscribe((res) => {
      this.bankList = res;
      this.allBankList = res;
      this.loadingScreen = false;
      this.isCityListDisabled = false;
      this.isSearchBoxDisabled = false;
    },
    (error) => {
      this.loadingScreen = false;
      this.isCityListDisabled = false;
      this.isSearchBoxDisabled = false;
      this.presentToast(error.message);
    });
  }

  public getAddress(bank: Bank) {
    return bank.address + " " + bank.state;
  }

  public searchBank() {
    console.log('Change Value');
    const patt = new RegExp('/' + this.searchText + '/');
    if (this.searchText.trim() === '') {
      this.bankList = this.allBankList;
    } else {
      this.bankList = this.allBankList.filter((res) => this.stringMatch(res, this.searchText));
    }
  }

  public stringMatch(data, searchText) {
    if (data.ifsc.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.branch.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.bank_name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.address.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.city.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.district.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (data.state.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  }

  async presentToast(toastMessage: string, toastDuration: number = 5000) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: toastDuration
    });
    toast.present();
  }
}
