import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  editMode: boolean = false;
  product: product;

  @ViewChild('productForm') productForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
      this.editMode = params['id'] != null;
      this.product = this.productService.getProductbyId(this.productId);
    })
    if (this.editMode) {
      setTimeout(() => {
        this.productForm.setValue(this.product);
      });
    }

  }

  onSubmit(form) {
    if (this.editMode) {
      let updatedProduct = new product(form.value.name, form.value.description, form.value.price, form.value.imagePath, null);
      console.log(updatedProduct);
      this.productService.updateProduct(updatedProduct, this.productId);
    }
    else {
      let newProduct = new product(form.value.name, form.value.description, form.value.price, form.value.imagePath, null);
      console.log(newProduct);
      this.productService.addProduct(newProduct);
    }
    this.router.navigate(['products']);
  }
}
