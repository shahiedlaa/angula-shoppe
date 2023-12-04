import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthGuard } from "../auth/auth-guard";
import { ModalPopComponent } from "../modal-pop/modal-pop.component";
import { SharedModule } from "../shared/shared.module";
import { ToastsComponent } from "../toasts/toasts.component";
import { ProductConfirmComponent } from "./product-confirm/product-confirm.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { InputFieldComponent } from "./product-form/input-field/input-field.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { ProductItemComponent } from "./products-list/product-item/product-item.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductResolverService } from "./products-resolver.service";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsStartComponent } from "./products-start/products-start.component";
import { ProductsComponent } from "./products.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductsStartComponent,
    ProductPageComponent,
    ProductFormComponent,
    ProductConfirmComponent,
    ToastsComponent,
    InputFieldComponent,
    ModalPopComponent,
  ],
  exports: [
    ProductEditComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductsStartComponent,
    ProductPageComponent,
    ProductFormComponent,
    ProductConfirmComponent,
    ToastsComponent,
    InputFieldComponent,
    ModalPopComponent
  ],
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ProductsRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class ProductsModule { }
