import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  MyInfoPage
  tab1Root = 'MyInfoPage';
  tab2Root = 'JoinMemberPage';
  tab3Root = 'MyWalletPage';
  tab4Root = 'AskHelpPage';

  constructor() {

  }
}
