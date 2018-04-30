import { Component } from '@angular/core';
import { NavController,  NavParams, LoadingController } from 'ionic-angular';
import { ProfilPage } from '../profil/profil'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect';
import $ from "jquery";
import {ServiceVarProvider } from '../../providers/service-var/service-var';
import { SettingsPage } from '../settings/settings';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


import 'rxjs/add/operator/first';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams ,private fb: Facebook,private twitter: TwitterConnect,
     public ServiceVarProvider:ServiceVarProvider, private http: HttpClient, public loadingController:LoadingController ) {
 
    
  }
  ngAfterViewInit(){
    $(document).ready(function(){
       

      var type = 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
      radius = '12em', //distance from center
      start = -90, //shift start from 0
      $elements = $('li:not(:first-child)'),
      numberOfElements = (type === 1) ?  $elements.length : $elements.length - 1, //adj for even distro of elements when not full circle
      slice = 360 * type / numberOfElements;
    
    $elements.each(function(i) {
      var $self = $(this),
          rotate = slice * i + start,
          rotateReverse = rotate * -1;
      
      $self.css({
          'transform': 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)'
      });
    });
    

    });
}




}



