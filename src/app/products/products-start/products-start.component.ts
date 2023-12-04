import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-start',
  templateUrl: './products-start.component.html',
  styleUrls: ['./products-start.component.css']
})
export class ProductsStartComponent {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/300`);

  constructor(config: NgbCarouselConfig, private router: Router, private route: ActivatedRoute) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  goType(type: string) {
    this.router.navigate([type], { relativeTo: this.route, queryParams: { category: type } })
  }

}
