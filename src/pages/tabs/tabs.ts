import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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

  constructor() {
    this.checkGroupExist()
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
