import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner';
@NgModule({
	declarations: [LoadingSpinnerComponent],
	imports: [IonicModule],
	exports: [LoadingSpinnerComponent]
})
export class ComponentsModule {}
