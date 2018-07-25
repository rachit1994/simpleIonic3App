import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { OtpPage } from '../otp/otp';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
	private register : FormGroup;
	private error = [];
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private dataService: DataService, public menuCtrl: MenuController) {
  	this.menuCtrl.enable(false, 'unautherized');
  	this.register = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.min(2)]) ],
      lastName: ['', Validators.compose([Validators.required, Validators.min(3)]) ],
      mobile: ['', Validators.compose([Validators.required, Validators.min(3), Validators.pattern(/^\+?\d{10}$/) ]),  ],
      email: ['', Validators.compose([Validators.required, Validators.min(3), Validators.email],) ],
      password: ['', Validators.compose([Validators.required, Validators.min(3), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]) ],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.min(3)]) ],
      acceptedTerms: ['false', Validators.required ],
      dob: ['', Validators.required],
      gender: [null, Validators.required],
    });
	}

	gotoLogin(e) {
  	this.navCtrl.push(LoginPage);
  }
	
	submitForm() {
		this.error = [];
		console.log('regisyter', this.register);
		const { firstName, lastName, mobile, email, password, confirmPassword, acceptedTerms } = this.register.value;
		
		const mobRegex = new RegExp(/^\+?\d{10}$/);
		const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
		const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

		if(!firstName || firstName.length < 2) {
			this.error.push('first name should have atleast 2 characters');
		}
		if(!lastName || lastName.length < 2) {
			this.error.push('last name should have atleast 2 characters');
		}
		if(!mobile || mobile.length == 0) {
			this.error.push('mobile number required');
		}
		if(!mobRegex.test(mobile)) {
			this.error.push('mobile number can only contain numbers or +');
		}
		if(!email || email.length == 0) {
			this.error.push('email required');
		}
		if(!emailRegex.test(email)) {
			this.error.push('email not valid');
		}
		if(!password || password.length == 0) {
			this.error.push('password requires');
		}
		if(!passwordRegex.test(password)) {
			this.error.push('password should have minimum eight characters, at least one letter, one number and one special character ');
		}
		if(confirmPassword != password) {
			this.error.push('confirm password not equal to password');
		}
		if(!acceptedTerms) {
			this.error.push('Please accept terms and conditions');
		}

		if(this.error.length == 0) {
			this.dataService.register(this.register.value).subscribe(
				(result:any) => {
					if(result && result.status === 200 && result.sendToOtpScreen) {
						this.navCtrl.push(OtpPage);
					} else if(result && result.status === 200 && result.sendToLoginScreen) {
						this.navCtrl.push(LoginPage);
					} else if(result && result.error) {
						this.error.push(result.error);
					} else {
						this.error.push('Some error occurred, Please try again later');
					}
				},
				error => {
					this.error.push('Some error occurred, Please try again later');
				}
			)
		}
	}
}
