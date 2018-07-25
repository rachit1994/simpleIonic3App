import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HomePage } from '../home/home';
import { UserService } from '../../services/user.service';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	private login: FormGroup;
	private error = '';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public menuCtrl: MenuController, private dataService: DataService, private userService: UserService) {
  	this.menuCtrl.enable(false);
  	this.login = this.formBuilder.group({
  		userId: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ]
  	});
	}

	gotoSignup(e) {
  	this.navCtrl.push(SignupPage);
  }

	submitForm() {
		if(!this.login || !this.login.value || this.login.value.userId.length == 0 ) {
			this.error = 'user id required';
		}
		if(this.error.length == 0) {
			this.dataService.login(this.login.value).subscribe(
				(result:any) => {
					if(result && result.status == 200 && result.verified) {
						this.userService.setUserId(this.login.value.userId);
						this.navCtrl.push(HomePage);
					} else {
						

						this.error = result.error;
					}
				},
				error => {
					//to remove
					this.userService.setUserId('1234');
					this.navCtrl.push(HomePage);
					
					this.error = 'Some error occurred, Please try again in later';
				}
				)
		}
	}
}
