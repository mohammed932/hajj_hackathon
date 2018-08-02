import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
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
  flightPath : any
  membersInfo: any[] = []
  points: any[] = []
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    private apiServ: ApiProvider,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {

    this.getCurrentMemberLocation()

  }


  ionViewDidLoad() {
    this.getGroupLocations()
    IntervalObservable.create(1000 * 2).subscribe(x => {
      // this.getGroupLocations2()

      this.clearMarkers()
      this.points = []
      console.log("tozzz");
    })

  }


  initMap() {
    this.presentMap()
  }

  getCurrentMemberLocation() {
    /* get current member location  */
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('current memner location : ', resp);
      this.setUpdateMapMemberLocation(resp.coords.latitude, resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    /* track member location */
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // this.points = []
      // this.getGroupLocations2()
      // this.setUpdateMapMemberLocation(data.coords.latitude, data.coords.longitude)
    });
  }

  presentMap() {
    let mapOptions = {
      center: { lat: Number(this.membersInfo[0].LatestLat), lng: Number(this.membersInfo[0].LatestLon) },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map)
    this.drawMarkers(this.map)
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({ content: 'انتظر...' });
    this.loading.present()
  }

  clearMarkers() {
    this.drawMarkers(null)
  }

DrawMarkers(mapp){
  for (var i = 0; i < this.points.length; i++) {
    var marker = new google.maps.Marker({
      position: { lat: this.points[i].lat, lng: this.points[i].lng },
      map: mapp
    })
  }
}

DrawLines(mapp){
  this.flightPath = new google.maps.Polygon({
    path: this.points,
    geodesic: true,
    strokeOpacity: 1.0,
    strokeWeight: 2
  })
  this.flightPath.setMap(mapp);
}

  drawMarkers(map) {
    for (let index = 0; index < this.membersInfo.length; index++) {
      this.points.push({ lat: Number(this.membersInfo[index].LatestLat), lng: Number(this.membersInfo[index].LatestLon), name: this.membersInfo[index].P_Name });
    }
    /* draw markers */
    this.RedrawMarkers(map);
    /* draw lines between markers */
    this.DrawLines(map);
  
      this.points=[];
      this.RedrawMarkers(null);
      this.DrawLines(null);
    
  }



  setUpdateMapMemberLocation(lat, lng) {
    this.mapData.LatestLat = lat
    this.mapData.LatestLng = lng
    this.mapData.Id = JSON.parse(localStorage.getItem('userInfo')).ID
    console.log('mapData : ', this.mapData);
    this.apiServ.updateMemberLocation(this.mapData).subscribe(data => {
      console.log("data map : ", data);
    })

  }

  getGroupLocations2() {
    this.apiServ.myGroup({ GroupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }).subscribe(data => {
      console.log("my-group info: ", data);
      this.membersInfo = data
      this.points = []
      this.drawMarkers(this.map)
    })
  }


  getGroupLocations() {
    this.apiServ.myGroup({ GroupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }).subscribe(data => {
      console.log("my-group info: ", data);
      this.membersInfo = data
      this.initMap()
    })
  }
}