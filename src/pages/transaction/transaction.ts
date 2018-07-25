import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
// to remove
import { transactions } from '../../mockData/transactions';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})

export class Transaction {
	private transactions: any = [];
 	private error: string = '';

  constructor(public navCtrl: NavController, private dataService: DataService, public menuCtrl: MenuController) {
  	this.menuCtrl.enable(true);
  	this.getTransactions();
  }

  getTransactions() {
  	this.dataService.getTransactions().subscribe(
			(result:any) => {
				this.transactions = [...result];
			},
			error => {
				//to remove
				console.log('mock=', transactions);
				this.transactions = transactions;
				this.error = 'some error occurred, please try later';
			}
		);
  }
}
