import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { Notification } from '../pages/notification/notification';
import { NotificationPage } from '../pages/notificationPage/notificationPage';
import { Transaction } from '../pages/transaction/transaction';
import { Settings } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OtpPage } from '../pages/otp/otp';
import { OtpVerifiedPage } from '../pages/otpVerified/otpVerified';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from  '@angular/common/http';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    Notification,
    NotificationPage,
    Transaction,
    Settings,
    LoginPage,
    SignupPage,
    OtpPage,
    OtpVerifiedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QRCodeModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    Notification,
    NotificationPage,
    Transaction,
    Settings,
    LoginPage,
    SignupPage,
    OtpPage,
    OtpVerifiedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
