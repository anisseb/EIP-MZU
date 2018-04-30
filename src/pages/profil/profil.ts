import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MatchingPage } from '../matching/matching';
import { SettingsPage } from '../settings/settings';
import { ServiceVarProvider } from '../../providers/service-var/service-var';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
  UserData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ServiceVarProvider: ServiceVarProvider) {
    this.UserData = this.ServiceVarProvider.UserInfo;
    console.log(this.UserData.email);
  }


  ionViewDidLoad() {
    
   
  }


  Logout()
  {
    this.navCtrl.push(HomePage,{Logout : 42 });
  }
}
  