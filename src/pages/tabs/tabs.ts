import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  MyInfoPage
  tab1Root = 'MyInfoPage';
  tab2Root = '';
  tab3Root = 'MyWalletPage';
  tab4Root = 'AskHelpPage';
  mapData: any = {};
  constructor(private apiServ: ApiProvider,private geolocation: Geolocation) {
    this.checkGroupExist()
    IntervalObservable.create(1000 * 10).subscribe(x => {
      this.getCurrentMemberLocation();
    });

  }
  getCurrentMemberLocation() {
    /* get current member location  */
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('i got new Location For Me');
      this.setUpdateMapMemberLocation(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  setUpdateMapMemberLocation(lat, lng) {
    this.mapData.LatestLat = lat
    this.mapData.LatestLng = lng
    this.mapData.Id = JSON.parse(localStorage.getItem('userInfo')).ID
    console.log('Now Location Is : ', this.mapData);
    this.apiServ.updateMemberLocation(this.mapData).subscribe(data => {
      console.log('i have updated My Location From Tabs',data);
    })

  }

  checkGroupExist() {
    console.log("grouup : ",JSON.parse(localStorage.getItem('userInfo')).Group_ID);
    this.tab2Root = 'AddGroupPage'
    if (JSON.parse(localStorage.getItem('userInfo')).Group_ID.includes("000000")) {
      this.tab2Root = 'AddGroupPage'
    } else {
      this.tab2Root = 'JoinMemberPage'
    }
  }
}
