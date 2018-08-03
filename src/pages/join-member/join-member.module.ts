import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinMemberPage } from './join-member';
import { NgxQRCodeModule } from 'ngx-qrcode2';
@NgModule({
  declarations: [
    JoinMemberPage,
  ],
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(JoinMemberPage),
    ComponentsModule
  ],
})
export class JoinMemberPageModule {}
