import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html',
})
export class AddInfoPage {
  passport: any
  waiting: boolean = false
  constructor(public navCtrl: NavController,
    private apiServ: ApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddInfoPage');
  }

  next() {
    this.waiting = true
    this.apiServ.getMemberInfo({ PilgrimsID: this.passport }).subscribe(data => {
      localStorage.setItem('userInfo', JSON.stringify(data))
      this.waiting = false
      this.navCtrl.setRoot('TabsPage')
    })

  }

}
