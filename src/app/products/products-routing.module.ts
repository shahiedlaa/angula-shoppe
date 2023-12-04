import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductResolverService } from './products-resolver.service';
import { ProductsStartComponent } from './products-start/products-start.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsStartComponent },
  { path: 'furniture', component: ProductsComponent, resolve: [ProductResolverService] },
  { path: 'toys', component: ProductsComponent, resolve: [ProductResolverService] },
  { path: 'treats', component: ProductsComponent, resolve: [ProductResolverService] },
  { path: '**', component: ProductPageComponent, pathMatch:'full'},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
