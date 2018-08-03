import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@IonicPage()
@Component({
  selector: 'page-ask-help',
  templateUrl: 'ask-help.html',
})
export class AskHelpPage {
  msg: any
  isLeft: boolean = false
  isRight: boolean = false
  loading: any
  messagesArr: any
  messageContainer: any[] = []
  constructor(public navCtrl: NavController,
    private apiService: ApiProvider,
    private loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.getMemberMessages()

    IntervalObservable.create(1000 * 2).subscribe(x => {
      this.getMemberMessages()
    })


  }

  getMemberMessages() {
    // this.presentLoading()
    let data = { groupID: JSON.parse(localStorage.getItem('userInfo')).Group_ID }
    this.apiService.getMemberMessages(data).subscribe(data => {
      console.log('Data leng : ' + data.length);
      if (data.length != this.messageContainer.length) {
        this.messageContainer = data
        this.SetMessageDirection()
        console.log('aaaa :', data);
        console.log("messages data : ", this.messageContainer);
        // this.loading.dismiss()
      }
    })
  }

  send() {
    console.log("new Date() : ", new Date());
    var d = new Date(); // for now

    // this.presentLoading()
    this.messageContainer.splice(this.messageContainer.length, 0, {
      messageTxt: this.msg,
      direction: 'right',
      lanCode: localStorage.getItem('userLang')
    })
    if (this.msg) {
      let data = {
        messgTxt: this.msg,
        lanCode: localStorage.getItem('userLang'),
        group_ID: JSON.parse(localStorage.getItem('userInfo')).Group_ID,
        pilgrim_ID: JSON.parse(localStorage.getItem('userInfo')).ID,
        sendDate: `${d.getHours()},${d.getMinutes()},${d.getSeconds()}#`
      }
      this.apiService.createMessage(data).subscribe(data => {
        console.log("ddcd : ", data);

        // this.loading.dismiss()
      })
      this.msg = ''
    }
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({ content: 'انتظر...' });
    this.loading.present()
  }

  askHelp() {
    console.log("ask help trigger");
  }


  SetMessageDirection() {
    this.messageContainer.forEach(item => {
      if (JSON.parse(localStorage.getItem('userInfo')).ID == item.pilgrimId) {
        item.direction = 'right'
      } else {
        item.direction = 'left'
        if (item.lanCode != localStorage.getItem('userLang') && item.translated != true) {
          let params = { languageTo: localStorage.getItem('userLang'), Text: item.messageTxt }
          this.apiService.postLang(params).subscribe(data => {
            console.log("data ::: ", data);
            item.messageTxt = data.TranslatedText;
            item.translated = true;
          })
        }
      }
    });
  }

}
