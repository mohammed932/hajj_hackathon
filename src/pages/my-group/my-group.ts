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
  mapData: any = {}
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

  ionViewWillEnter(){
    this.initMap();
  }




  setUpdateMapMemberLocation(lat, lng) {
    this.mapData.LatestLat = lat
    this.mapData.LatestLng = lng
    this.mapData.Id = JSON.parse(localStorage.getItem('userInfo')).ID
    console.log('mapData : ', this.mapData);
    this.apiServ.updateMemberLocation(this.mapData).subscribe(data => {
      this.getGroupLocations()
      console.log("data map : ", data);
    })

  }


  ionViewDidLoad() {
    this.initMap();
  }


  initMap() {
    if (this.membersInfo.length > 0) {
      this.presentMAp()
    }

  }

  presentMAp() {

    let points = [];
    for (let index = 0; index < this.membersInfo.length; index++) {
      points.push({ lat: Number(this.membersInfo[index].latestLat), lng: Number(this.membersInfo[index].latestLon), name: this.membersInfo[index].pName });
    }
    let mapOptions = {
      center: { lat: points[0].lat, lng: points[0].lng },
      zoom: 18,
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

  getGroupLocations() {
    this.apiServ.myGroup({ GroupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }).subscribe(data => {
      console.log("my-group info: ", data);
      this.membersInfo = data
      this.initMap()
    })
  }


}