import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { ShareButtonsModule} from 'ngx-sharebuttons/buttons'
import {ShareIconsModule} from 'ngx-sharebuttons/icons'


@NgModule({
  declarations:[
    LoadingSpinnerComponent
  ],
  imports:[
    CommonModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  exports:[
    LoadingSpinnerComponent,
    CommonModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
})
export class SharedModule{}
