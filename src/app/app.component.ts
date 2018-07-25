import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { Transaction } from '../pages/transaction/transaction';
import { Settings } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { OtpPage } from '../pages/otp/otp';
import { OtpVerifiedPage } from '../pages/otpVerified/otpVerified';

import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string, color: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private dataService: DataService, private userService: UserService) {
    this.initializeApp();
    this.splashScreen.show();
    console.log(this.dataService);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', color: 'primary' },
      { title: 'My Transactions', component: Transaction, icon: 'cash', color: 'green' },
      { title: 'My Profile', component: ProfilePage, icon: 'person', color: 'orange' },
      { title: 'My Settings', component: Settings, icon: 'settings', color: 'purple' },
      { title: 'Signup', component: SignupPage, icon: 'settings', color: 'purple' },
      { title: 'Login', component: LoginPage, icon: 'settings', color: 'purple' },
      { title: 'Otp', component: OtpPage, icon: 'settings', color: 'purple' },
      { title: 'Otp verified', component: OtpVerifiedPage, icon: 'settings', color: 'purple' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const userId = this.userService.getUserId();
      if(!userId || userId.length == 0) {
        this.nav.setRoot(LoginPage);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
