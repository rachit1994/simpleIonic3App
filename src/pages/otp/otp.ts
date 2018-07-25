import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { OtpVerifiedPage } from '../otpVerified/otpVerified';

@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html'
})
export class OtpPage {
	private otp: FormGroup;
	private error = '';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public menuCtrl: MenuController, private dataService: DataService) {
  	this.menuCtrl.enable(false);
  	this.otp = this.formBuilder.group({
  		otp: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ]
  	});
	}
	submitForm() {
		if(!this.otp || !this.otp.value || this.otp.value.otp.length == 0 ) {
			this.error = 'OTP required';
		}
		if(this.error.length == 0) {
			this.dataService.verifyOtp(this.otp.value).subscribe(
				(result:any) => {
					if(result && result.status == 200 && result.verified) {
						this.navCtrl.push(OtpVerifiedPage);
					} else {
						this.error = result.error;
					}
				},
				error => {
					this.error = 'Some error occurred, Please try again in later';
				}
				)
		}
	}
}
