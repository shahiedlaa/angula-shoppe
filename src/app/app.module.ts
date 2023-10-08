import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/products-list/product-item/product-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsStartComponent } from './products/products-start/products-start.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductPageComponent } from './products/product-page/product-page.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { InputFieldComponent } from './products/product-form/input-field/input-field.component';
import { ModalPopComponent } from './modal-pop/modal-pop.component';
import { ProductConfirmComponent } from './products/product-confirm/product-confirm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ShoppingCartComponent,
    ProductsStartComponent,
    ProductEditComponent,
    ProductPageComponent,
    ProductFormComponent,
    InputFieldComponent,
    ModalPopComponent,
    ProductConfirmComponent,
    ToastsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
