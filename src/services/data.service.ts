import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import urls from '../configs/urls';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  constructor(private httpClient : HttpClient) { 
	  console.log('urls', urls);
  }

  register(fields) {
  	const formFields = JSON.stringify(fields);
  	return this.httpClient.post(`${urls.baseUrl}${urls.register}`, formFields, httpOptions);
  }
  
  login(userId) {
  	const formFields = JSON.stringify(userId);
  	return this.httpClient.post(`${urls.baseUrl}${urls.login}`, formFields, httpOptions); 
  }

  verifyOtp(otp) {
  	const formFields = JSON.stringify(otp);
    console.log('here', otp);
  	return this.httpClient.post(`${urls.baseUrl}${urls.verifyOtp}`, formFields, httpOptions);
  }

  getAccount(userId) {
  	return this.httpClient.get(`${urls.baseUrl}${urls.getAccount}`, httpOptions);
  }

  getTransactions() {
  	return this.httpClient.get(`${urls.baseUrl}${urls.getTransactions}`);
  }

  getNotifications() {
  	return this.httpClient.get(`${urls.baseUrl}${urls.getNotifications}`);
  }

  getProfile() {
    return this.httpClient.get(`${urls.baseUrl}${urls.getProfile}`);
  }

  modifyProfile(profile) {
    const formFields = JSON.stringify(profile);
  	return this.httpClient.post(`${urls.baseUrl}${urls.modifyProfile}`, formFields, httpOptions);
  }

  setPushNotificationStatus(status) {
  	const formFields = JSON.stringify(status);
  	return this.httpClient.post(`${urls.baseUrl}${urls.setPushNotificationStatus}`, formFields, httpOptions);
  }

  setEmailNotificationStatus(status) {
  	const formFields = JSON.stringify(status);
  	return this.httpClient.post(`${urls.baseUrl}${urls.setEmailNotificationStatus}`, formFields, httpOptions);
  }

}