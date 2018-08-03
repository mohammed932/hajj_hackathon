import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-join-member',
  templateUrl: 'join-member.html',
})
export class JoinMemberPage {
  Members: any
  groupID: any
  createdCode: any = null
  loadingSpinner: boolean = true
  constructor(public navCtrl: NavController,
    private apiServ: ApiProvider,
    private barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {
    this.getGroup()
    this.groupID = JSON.parse(localStorage.getItem('groupId'))
    this.createdCode = this.groupID
    console.log("my group id : ", this.groupID);
  }

  next() {
    this.navCtrl.setRoot('MyGroupPage', { membersData: this.Members })
  }

  plus() {

  }

  getGroup() {
    this.apiServ.myGroup({ GroupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }).subscribe(data => {
      console.log("group asssss: ", JSON.stringify(data) );
      this.loadingSpinner = false
      this.Members = data
    }, err => {
      console.log("get group err : ", err);

    })
  }



}
