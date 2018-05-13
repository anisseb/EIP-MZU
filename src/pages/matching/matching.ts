import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServiceVarProvider } from '../../providers/service-var/service-var';

/**
 * Generated class for the MatchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})
export class MatchingPage {
  public zizou: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ServiceVarProvider:ServiceVarProvider ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchingPage');
  }



}
