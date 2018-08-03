import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html',
})
export class AddInfoPage {
  passport: any
  mapData: any = {}
  waiting: boolean = false
  constructor(public navCtrl: NavController,
    private apiServ: ApiProvider,
    private platform: Platform,
    private geolocation: Geolocation,
    public navParams: NavParams) {
      this.checkPassportExistence()
  }


  next() {
    this.waiting = true
    this.apiServ.getMemberInfo({ PilgrimsID: this.passport }).subscribe(data => {
      localStorage.setItem('passport', this.passport)
      localStorage.setItem('userInfo', JSON.stringify(data))
      localStorage.setItem('groupId', JSON.stringify(data.Group_ID))
      this.waiting = false
      this.platform.ready().then(() => {
        this.getCurrentMemberLocation()
        this.navCtrl.setRoot('TabsPage')
      })
    })

  }


  getCurrentMemberLocation() {
    /* get current member location  */
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('i have Got my Location : ', resp)
      this.setUpdateMapMemberLocation(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  checkPassportExistence() {
    if (localStorage.getItem('passport')) {
      this.passport = localStorage.getItem('passport')
    }
  }


  setUpdateMapMemberLocation(lat, lng) {
    this.mapData.LatestLat = lat
    this.mapData.LatestLng = lng
    this.mapData.Id = JSON.parse(localStorage.getItem('userInfo')).ID
    console.log('Trying to Update My Db Location With : ', this.mapData);
    this.apiServ.updateMemberLocation(this.mapData).subscribe(data => {
      console.log("Db Location Updated: ", data);
    })

  }
}
