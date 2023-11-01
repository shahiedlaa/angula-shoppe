import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { product } from "./product.model";
import { ProductService } from "./products.service";

@Injectable({ providedIn: 'root' })

export class ProductResolverService implements Resolve<product[]>{
  constructor(private dataService: DataStorageService, private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productService.getProducts();

    if (products.length == 0) {
      return this.dataService.fetchProducts();
    }
    else {
      return products;
    }
  }
}
