import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Pinterest, PinterestUser, PinterestPin, PinterestBoard } from '@ionic-native/pinterest';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilPage} from '../pages/profil/profil'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatchingPage } from '../pages/matching/matching'
import { SettingsPage } from '../pages/settings/settings';
import { ServiceVarProvider } from '../providers/service-var/service-var';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { LoginPage } from '../pages/login/login';
import { VideoPlayer } from '@ionic-native/video-player';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    ProfilPage,
    LoginPage,
    MatchingPage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage,
    ProfilPage,
    MatchingPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    Camera,
    VideoPlayer,
    HttpClientModule,
    Facebook,
    Pinterest,
    ServiceVarProvider,
    TwitterConnect,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
