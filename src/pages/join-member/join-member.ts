import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-join-member',
  templateUrl: 'join-member.html',
})
export class JoinMemberPage {
  Members: any
  loadingSpinner: boolean = true
  constructor(public navCtrl: NavController,
    private apiServ: ApiProvider,
    public navParams: NavParams) {
    this.getGroup()
  }

  next() {
    this.navCtrl.setRoot('MyGroupPage')
  }

  plus() {

  }

  getGroup() {
    this.apiServ.myGroup({ GroupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }).subscribe(data => {
      console.log("group : ", data);
      this.loadingSpinner = false
      this.Members = data
    })
  }

}
