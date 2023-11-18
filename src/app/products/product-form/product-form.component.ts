import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { product } from '../product.model';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  productId: number;
  productReceived: Subscription;
  editMode: boolean = false;
  product: product;
  productForm: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl(``, [Validators.required, Validators.minLength(3), Validators.pattern('^[^0-9]+$')]),
      description: new FormControl('', [Validators.required, Validators.pattern('(.*)[^.]$')]),
      color: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]+$')]),
      maxLoad: new FormControl('', [Validators.required]),
      careInfo: new FormControl('', [Validators.required, Validators.pattern('(.*)[^.]$')]),
      price: new FormControl('', [Validators.required]),
      imagePath1: new FormControl('', [Validators.required, Validators.pattern('^http.*$')]),
      imagePath2: new FormControl('', [Validators.required, Validators.pattern('^http.*$')]),
      imagePath3: new FormControl('', [Validators.required, Validators.pattern('^http.*$')]),
      warranty: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.productService.$emitNew.subscribe((value: boolean) => {
      if (value) {
        this.editMode = false;
        this.productForm.reset();
      }
    })
    this.productReceived = this.productService.$emitProduct.subscribe((product: product) => {
      if (product) {
        this.product = product;
        this.editMode = true;
        this.productForm.setValue({
          name: `${this.product.name}`,
          description: `${this.product.description}`,
          color: `${this.product.specification.color}`,
          maxLoad: `${this.product.specification.maxLoad}`,
          careInfo: `${this.product.specification.careInfo}`,
          price: `${this.product.price}`,
          imagePath1: `${this.product.imagePath[0]}`,
          imagePath2: `${this.product.imagePath[1]}`,
          imagePath3: `${this.product.imagePath[2]}`,
          warranty: `${this.product.warrranty}`,
        })
      }
    })
    this.productService.$emitIndex.subscribe((index) => {
      this.productId = index;
    });
  }

  onSubmit(form: FormGroup) {
    let newProductSpecs: any = {
      color: form.value.color,
      maxLoad: form.value.maxLoad,
      careInfo: form.value.careInfo
    }
    let newProductImages: string[] = [
      `${form.value.imagePath1}`,
      `${form.value.imagePath2}`,
      `${form.value.imagePath3}`,
    ]
    let newProduct = new product(form.value.name, form.value.description, newProductSpecs, form.value.price, newProductImages, form.value.warranty)

    console.log(newProduct)

    if (this.editMode) {
      this.productService.updateProduct(newProduct, this.productId);
    }
    else this.productService.addProduct(newProduct);
  }

  ngOnDestroy() {
    this.productReceived.unsubscribe();
  }

}
