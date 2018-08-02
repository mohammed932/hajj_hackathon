import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {
  userInfo: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getInfo()
  }


  next() {
    this.navCtrl.setRoot('JoinMemberPage')
  }

  getInfo() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }


  getGender(type) {
    if (type == 'M') {
      return 'ذكر'
    } else {
      return 'انثي'
    }
  }
}
