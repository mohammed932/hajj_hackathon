import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-my-group',
  templateUrl: 'my-group.html',
})


export class MyGroupPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  loading: any
  membersInfo: any[] = []
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private apiServ: ApiProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.membersInfo = this.navParams.get('membersData')
    console.log('membersInfo : ', this.membersInfo);

  }


  ionViewDidLoad() {
    this.initMap();
  }


  initMap() {
    if (this.membersInfo.length > 0) {
      this.presentLoading()
      this.presentMAp()
      this.loading.dismiss()
    }

  }

  presentMAp() {

    let points = [];
    for (let index = 0; index < this.membersInfo.length; index++) {
      points.push({ lat: Number(this.membersInfo[index].LatestLat), lng: Number(this.membersInfo[index].LatestLon), name: this.membersInfo[index].P_Name });
    }
    let mapOptions = {
      center: { lat: points[0].lat, lng: points[0].lng },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map)

    var infowindow = new google.maps.InfoWindow();

    /* draw markers */
    for (var i = 0; i < points.length; i++) {
      var marker = new google.maps.Marker({
        position: { lat: points[i].lat, lng: points[i].lng },
        map: this.map
      })
    }

    /* draw lines between markers */
    var flightPath = new google.maps.Polygon({
      path: points,
      geodesic: true,
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({ content: 'انتظر...' });
    this.loading.present()
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  }
}