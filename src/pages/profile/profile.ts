import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
	private editMode: boolean = false;
	private profileForm: FormGroup;
	private profile = {
		email: '',
		name: '',
		mobile: '',
		dob: '',
		profession: ''
	};

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private dataService: DataService, public toastCtrl: ToastController) {
  	this.profileForm = this.formBuilder.group({
  		name: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ],
  		mobile: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ],
  		dob: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ],
  		profession: [ '' , Validators.compose([Validators.required, Validators.min(2)]) ],
  	});
  }

  setEditMode(value) {
  	this.editMode = value;
  }

  submitForm() {
  	this.dataService.modifyProfile(this.profileForm.value).subscribe(
  		(result: any) => {
  			if(result.status == 200) {
  				const email = this.profile.email;
  				this.profile = this.profileForm.value;
  				this.profile['email'] = email;
  				const toast = this.toastCtrl.create({
			      message: 'updated successfully',
			      duration: 3000
			    });
			    toast.present();
  			} else {
  				const toast = this.toastCtrl.create({
			      message: 'some error occurred',
			      duration: 3000
			    });
			    toast.present();
  			}
  		},
  		error => {
  			const toast = this.toastCtrl.create({
			      message: 'some error occurred, please try later',
			      duration: 3000
			    });
			    toast.present();
  		}
  	);
  }

}
