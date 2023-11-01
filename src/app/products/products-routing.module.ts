import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';
import { ProductResolverService } from './products-resolver.service';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent,resolve: [ProductResolverService], canActivate:[AuthGuard]},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
