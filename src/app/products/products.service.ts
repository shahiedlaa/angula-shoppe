import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  productSelected = new EventEmitter<product>();
  sendProductId = new EventEmitter<number>();
  $productChanged = new EventEmitter<product[]>();
  $emitIndex = new BehaviorSubject(null);
  $emitProduct = new BehaviorSubject(null);
  $editMode = new EventEmitter<boolean>();
  $emitNew = new Subject<boolean>();
  $formState = new BehaviorSubject(null);

  private products: product[] = [
    new product(
      'hans',
      `Wood plywood base. The frame made of rubberwood is strong and long-lasting. Linen fabric cover. Seat and backrest made of foam with a high density of polyurethane. Curved, sleek armrests`,
      {
        color: 'beige', maxLoad: 200, careInfo: `Keep the sofa away from direct sunlight to prevent the color from fading out. Vacuum and clean regularly, at least once a week.
      Treat and remove stains immediately. Vacuum the spot to remove any loose particles available. Mix a small amount of dish soap with cool water to create a mild cleaning solution.
      Dampen a microfiber cloth in the solution and gently blot the stain`},
      450,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/1/_/1_133_252.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/2/_/2_123_253.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/3/_/3_113_245.jpg'],
      3),
    new product(
      'joro',
      `Solid rubberwood frame and legs. Fabric upholstery. Polyurethane foam cushioned backrest & seat. Comes with 1 pillow cushion filled with polyester fibre`,
      {
        color: 'beige', maxLoad: 110, careInfo: `Keep the sofa away from direct sunlight to prevent the colour from fading out. Vacuum and clean your fabric sofa regularly, at least once a week.
        Treat and remove stains immediately. Vacuum the spot to remove any loose particles available`},
      150,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/1/_/1_seater.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/2/_/2_128_15.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/3/_/3_116_30.jpg'],
      4),
    new product(
      'soki',
      `Crafted from durable Oak wood or Beech wood of the highest quality.
        Wood surfaces are provided enhanced protection through the use of four coats of environmentally-friendly varnish.
        The seat is padded with foam and covered in polyester fabric. Seat cover that can be easily taken off and cleaned`,
      {
        color: 'grey', maxLoad: 95, careInfo: `Avoid contact with water. Use a soft, damp cloth. Where needed, use a mild, alcohol-free soap that doesn't cause abrasion. Wipe dry with another cloth to remove residual moisture. Use a dehumidifier to prevent moulding.
        Place furniture away from direct sunlight and areas with high humidity`},
      150,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x719/040ec09b1e35df139433887a97daa66f/0/l/0l4b7688_.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/8/0/800-800_6.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/0/l/0l4b7720_.jpg'],
      4),
    new product(
      'Iman',
      `Soft and cozy Sherpa fabric for a comfortable feel.
      High-density foam filling provides support and resilience.
      Sturdy polyethylene structure ensures durability and stability`,
      {
        color: 'beige', maxLoad: 55, careInfo: `Avoid placing your furniture in direct sunlight and areas with humidity. Vacuum and clean regularly, at least once a week.
        Treat and remove stains immediately. Lift to move furniture, avoid pushing. Avoid placing sharp objects or items with rough surfaces on it, as they can snag or damage the material`},
      150,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/o/r/orlaith_kidas_chair2_1.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/o/r/orlaith_kidas_chair3_1.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/o/r/orlaith_kidas_chair6_1.jpg'],
      4),
    new product(
      'Rumi',
      `Comprises two parallel flowing Z-shaped forms that form the legs and back frame.
       With a naturally reclined backrest and curved armrests, it provides much comfort for your seating pleasure`,
      {
        color: 'brown', maxLoad: 90, careInfo: `For indoor use only
        Avoid contact with water.
        Remove dirt or dust from harder-to-reach places using a soft brush or a handheld vacuum cleaner, once a week.
        Use a soft, damp cloth. Where needed, use a mild, alcohol-free soap that doesn't cause abrasion. Wipe dry with another cloth to remove residual moisture. Use a dehumidifier to prevent moulding.
        Place furniture away from direct sunlight and areas with high humidity`},
      150,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/17f82f742ffe127f42dca9de82fb58b1/w/i/willow_rattan_lounge_chair_walnut__mg_7721.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/i/willow_rattan_lounge_chair_walnut__mg_7723.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/w/i/willow_rattan_lounge_chair_walnut__mg_7725.jpg'],
      4),
    new product(
      'Fero',
      `Natural rattan webbing chair in white oak tone. Handcrafted by skilled artisans in Indonesia. Breathable and comfortable seating. Lightweight, strong and durable`,
      {
        color: 'beige', maxLoad: 100, careInfo: `For semi-outdoor use only. Avoid soaking or over saturating the product with water. Once weekly, use a duster or vacuum cleaner to remove dirt or dust.
        Once monthly, use a soft cloth dipped into a cleaning solution of warm water and dishwashing liquid to wipe down the furniture. Wipe dry with another cloth to remove residual moisture. Leave to air-dry
        Place furniture away from direct sunlight and areas with high humidity`},
      150,
      ['https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/17f82f742ffe127f42dca9de82fb58b1/g/i/giotto_rattan_chair_natural__mg_4471cc_2.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/g/i/giotto_rattan_chair_natural__mg_4473_2.jpg',
        'https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/g/i/giotto_rattan_chair_natural__mg_4474_2.jpg'],
      4),


  ];

  constructor() { }

  getProducts() {
    return this.products.slice();
  }

  getProductbyId(index: number) {
    return this.products.slice()[index];
  }

  addProduct(product: product) {
    this.products.push(product);
    this.$productChanged.emit(this.products.slice());
  }

  updateProduct(product: product, index: number) {
    this.products[index] = product;
    this.$productChanged.emit(this.products.slice())
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.$productChanged.emit(this.products.slice());
  }

}
