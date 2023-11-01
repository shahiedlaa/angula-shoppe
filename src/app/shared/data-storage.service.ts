import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { ProductService } from "../products/products.service";
import { product } from "../products/product.model";
import { exhaustMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(private http: HttpClient, private productService: ProductService, private authService: AuthService) { }

  storeProducts() {
    const products = this.productService.getProducts();
    this.http.put('https://shopperapp-98f75-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', products).subscribe((response) => {
      console.log(response)
    });
  }

  fetchProducts() {
    return this.http.get<product[]>('https://shopperapp-98f75-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
      .pipe(
        tap(products => {
          this.productService.setProducts(products);
        }))
  }

}
