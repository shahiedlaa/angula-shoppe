import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductPageComponent } from './products/product-page/product-page.component';
import { ProductsStartComponent } from './products/products-start/products-start.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    children: [{
      path: '',
      component: ProductsStartComponent
    },
    {
      path: 'new',
      component: ProductEditComponent
    },
    {
      path: ':id',
      component: ProductDetailComponent
    },
    {
      path: ':id/edit',
      component: ProductEditComponent
    }],
  },
  { path: 'cart', component: ShoppingCartComponent },
  { path: '**', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
