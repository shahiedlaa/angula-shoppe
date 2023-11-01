import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthenticated:boolean = false;
  userSub: Subscription;

  constructor(private dataService:DataStorageService, private authService:AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !user? false: true;
    })
  }

  storeProducts(){
    this.dataService.storeProducts();
  }

  fetchProducts(){
    this.dataService.fetchProducts().subscribe();
  }

  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}
