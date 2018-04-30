import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from "jquery";
import { ServiceVarProvider } from '../../providers/service-var/service-var';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ProfilPage } from '../profil/profil'
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  UserData: any;
  public zizou: any;
  public ToggleFb: boolean = false;
  DataId: any;
  public data:any;
  public ToggleTwitter: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ServiceVarProvider:ServiceVarProvider,
     private fb: Facebook, private twitter: TwitterConnect) {

    
    this.UserData = this.ServiceVarProvider.UserId;
    //console.log(this.ServiceVarProvider.UserId);
    this.ServiceVarProvider.getUser(this.UserData).first().subscribe(rep => this.zizou = rep,
			error => console.log("Error: ", error),
			() => {
        this.FacebookConnexion(this.zizou);
         if(this.zizou.twitter_linked == 2)
         {
           this.ToggleTwitter = true;
           $('#btn_twitter').css('pointer-events','none');
         }
    	});

  }


  
  FacebookConnexion(zizou){
    if(this.zizou.facebook_linked == 2)
    {
       this.ToggleFb = true;
       $('#btn_facebook').css('pointer-events','none');
    }
   
  }

 



  Fblogin()
  {
    
    
    this.fb.login(['public_profile', 'user_friends', 'email']).then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,first_name, last_name, email,birthday,friends,likes,picture.width(320).height(220).as(picture_large)', []).then(profile => {
        this.UserData = { email: profile['email'], first_name: profile['first_name'], 
                          last_name: profile['last_name'],birthday: profile['birthday'], picture: profile['picture_large']['data']['url']}

       this.ServiceVarProvider.NetworkId =  res.authResponse.userID;
        this.ServiceVarProvider.FbAccessToken =  res.authResponse.accessToken;
        this.UpdateUserByFb(this.UserData);
        console.log(this.UserData.email);
        this.ServiceVarProvider.UserInfo = this.UserData;

        
    });

  });
   // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  
  }



  UpdateUserByFb(UserData)
  {
  

    //Update user
    var form = new FormData();
    form.append("facebook_linked", "2");
        
        this.ServiceVarProvider.updateUser(form).first().subscribe(rep => this.data = rep,
          error => console.log("ErrorUpdatebyFb: ", error),
          () => this.getUserDataFb());
  
  
  }

  getUserDataFb() {

    var form = new FormData();
    form.append("user_id", this.ServiceVarProvider.UserId);
    form.append("type", "2");
    form.append("network_id", this.ServiceVarProvider.NetworkId);
    form.append("secret_token", this.ServiceVarProvider.FbSecret);
    form.append("access_token",  this.ServiceVarProvider.FbAccessToken);
    form.append("refresh_token", "34567890");
    form.append("last_update", "");
  
  
    //console.log(this.data.id);
    this.ServiceVarProvider.addToken(form).first().subscribe(rep => this.zizou = rep,
      error => console.log("Error: ", error),
      () => {
         console.log(this.zizou.msg);
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
        this.ServiceVarProvider.NetworkIdTwitter = res.userId;
        this.ServiceVarProvider.TwitterAccessToken = res.token;
        this.ServiceVarProvider.TwitterSecret = res.secret
     // this.navCtrl.push(TabsControllerPage,{data : this.UserData });
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
    form.append("network_id", this.ServiceVarProvider.NetworkIdTwitter);
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

  ionViewDidLoad() {
    //this.UserData = this.navParams.get('Data2');
    //console.log(this.UserData);
  }

}
