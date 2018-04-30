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
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Log: any;
  UserData: any;
  nativStorage : any;
  DataId: any;
  public jsonObject: any;
  public data:any;
  public zizou: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams ,private fb: Facebook,private twitter: TwitterConnect,
    public ServiceVarProvider:ServiceVarProvider, private http: HttpClient, public loadingController:LoadingController ) {

   this.Log = this.navParams.get('Logout');
   if (this.Log == 42)
     this.logout();

 }



  Fblogin()
  {
    
    this.fb.login(['public_profile', 'user_friends', 'email']).then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,first_name, last_name, email,birthday,friends,likes,picture.width(320).height(220).as(picture_large)', []).then(profile => {
        this.UserData = {email: profile['email'], first_name: profile['first_name'], last_name: profile['last_name'],birthday: profile['birthday'], picture: profile['picture_large']['data']['url']}

        this.ServiceVarProvider.NetworkId = res.authResponse.userID;
        this.ServiceVarProvider.FbSecret = res.authResponse.secret;
       this.ServiceVarProvider.FbAccessToken =  res.authResponse.accessToken;
        this.RegisterUserbyFb(profile);
        
    });

  });
   // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  
  }

  

RegisterUserbyFb(profile)
{

  var form = new FormData();
  form.append("first_name", profile['first_name']);
  form.append("last_name", profile['last_name']);
  form.append("email", profile['email']);
  form.append("profile_picture", profile['picture_large']['data']['url']);
  form.append("facebook_linked", "2");
  form.append("twitter_linked", "");
  form.append("pinterest_linked", "");
  form.append("gmail_linked", "");
  form.append("instagram_linked", "");
  form.append("last_update", "");

      this.ServiceVarProvider.createUser(form).first().subscribe(rep => this.data = rep,
        error => console.log("Error: ", error),
        () => this.getUserDataFb());


}

getUserDataFb() {

  var form = new FormData();
  form.append("user_id", this.data.id);
  form.append("type", "2");
  form.append("network_id", this.ServiceVarProvider.NetworkId);
  form.append("access_token",  this.ServiceVarProvider.FbAccessToken);
  form.append("secret_token", this.ServiceVarProvider.FbSecret);
  form.append("refresh_token", "34567890");
  form.append("last_update", "");


  
  console.log(this.data.id);
  this.ServiceVarProvider.addToken(form).first().subscribe(rep => this.zizou = rep,
    error => console.log("Error: ", error),
    () => {
       console.log(this.zizou.msg);
    });

  this.ServiceVarProvider.getUser(this.data.id).first().subscribe(rep => this.zizou = rep,
    error => console.log("Error: ", error),
    () => {
       this.ServiceVarProvider.UserInfo = this.zizou;
        this.ServiceVarProvider.UserId = this.data.id;
    });
}


   TweetLogin()
  {
    //Request for login
   this.twitter.login().then((res: TwitterConnectResponse) =>{
    this.twitter.showUser().then(user => {
      this.UserData = {first_name: user.name,
        username: user.screen_name,
        followers: user.followers_count,
        picture: user.profile_image_url_https}
        console.log(this.UserData.first_name);
        this.ServiceVarProvider.NetworkId = res.userId;
        this.ServiceVarProvider.TwitterAccessToken = res.token;
        this.ServiceVarProvider.TwitterSecret = res.secret
      this.navCtrl.push(TabsControllerPage,{data : this.UserData });
      this.RegisterUserbyTwitter(this.UserData);
    });

    });

  }

  RegisterUserbyTwitter(UserData)
  {
  
    var form = new FormData();
    form.append("first_name", this.UserData.first_name);
    form.append("last_name", "titi");
    form.append("email", "anisse71100@toto.fr");
    form.append("facebook_linked", "");
    form.append("twitter_linked", "2");
    form.append("pinterest_linked", "");
    form.append("gmail_linked", "");
    form.append("instagram_linked", "");
    form.append("last_update", "");


        this.ServiceVarProvider.createUser(form).first().subscribe(rep => this.data = rep,
          error => console.log("Error: ", error),
          () => this.getUserDataTwitter());
  
  
  }
  
  getUserDataTwitter() {

    var form = new FormData();
    form.append("user_id", this.data.id);
    form.append("type", "2");
    form.append("network_id", this.ServiceVarProvider.NetworkId);
    form.append("secret_token", this.ServiceVarProvider.TwitterSecret);
    form.append("access_token", this.ServiceVarProvider.TwitterAccessToken);
    form.append("refresh_token", "34567890");
    form.append("last_update", "");
  
  
    console.log(this.data.id);
    this.ServiceVarProvider.addToken(form).first().subscribe(rep => this.zizou = rep,
      error => console.log("Error: ", error),
      () => {
         console.log(this.zizou.msg);
      });
  
    this.ServiceVarProvider.getUser(this.data.id).first().subscribe(rep => this.zizou = rep,
      error => console.log("Error: ", error),
      () => {
         this.ServiceVarProvider.UserInfo = this.zizou;
          this.ServiceVarProvider.UserId = this.data.id;
      });
  }
  
  logout()
  {
    this.fb.logout();
  }
}
