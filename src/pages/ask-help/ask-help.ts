import { ApiProvider } from '../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ask-help',
  templateUrl: 'ask-help.html',
})
export class AskHelpPage {
  msg: any
  messageContainer: any[] = []
  constructor(public navCtrl: NavController,
    private apiService: ApiProvider,
    public navParams: NavParams) {
  }


  send() {

    if (this.msg) {
      let params = { languageTo: 'EN', Text: this.msg }
      this.apiService.postLang(params).subscribe(data => {
        console.log("data : ", data);
        this.messageContainer.push(data.TranslatedText)
      })
      this.msg = ''
    }
  }

  askHelp() {
    console.log("ask help trigger");
  }

}
