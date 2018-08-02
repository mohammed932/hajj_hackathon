import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(){
    console.log("page name");
  }

}
