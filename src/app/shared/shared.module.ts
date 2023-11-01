import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations:[
    LoadingSpinnerComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    LoadingSpinnerComponent,
    CommonModule
  ],
})
export class SharedModule{}
