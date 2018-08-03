import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {
  waiting: boolean = false
  groupName: any
  waitingScan: boolean = false
  constructor(public navCtrl: NavController,
    private apiService: ApiProvider,
    private barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {
  }

  add() {
    this.waiting = true
    let data = {
      groupName: this.groupName,
      groupCountry: JSON.parse(localStorage.getItem('userInfo')).Country
    }
    this.apiService.addGroup(data).subscribe(data => {
      let obj = {
        pilgrimId: JSON.parse(localStorage.getItem('userInfo')).ID,
        groupId: data
      }
      let temp = JSON.parse(localStorage.getItem('userInfo'));
      temp.Group_ID = data
      localStorage.setItem('userInfo', JSON.stringify(temp));

      this.apiService.updatePligirmGroup(obj).subscribe(data => {
        console.log("hhh : ", data);

      })
      console.log("ccomm data :", data)
      this.waiting = false
      localStorage.setItem('groupId', JSON.stringify(data))
      this.navCtrl.setRoot('JoinMemberPage')
    })

  }



  scanCode() {
    this.waitingScan = true
    this.barcodeScanner.scan().then(data => {
      console.log('scanned data : ', data);
      // alert('scan data : ' + data.text)
      let obj = {
        pilgrimId: JSON.parse(localStorage.getItem('userInfo')).ID,
        groupId: data.text
      }
      this.apiService.updatePligirmGroup(obj).subscribe(data => {
        console.log("my comm data : ", data);
        let temp = JSON.parse(localStorage.getItem('userInfo'));
        temp.Group_ID = obj.groupId
        localStorage.setItem('userInfo', JSON.stringify(temp));
        this.navCtrl.setRoot('JoinMemberPage')
        this.waitingScan = false
      })
    }, (err) => {
      console.log('Error: ', err);
      this.waitingScan = false
    });
  }

}
