import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinMemberPage } from './join-member';

@NgModule({
  declarations: [
    JoinMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinMemberPage),
    ComponentsModule
  ],
})
export class JoinMemberPageModule {}
