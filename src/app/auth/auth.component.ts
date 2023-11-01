import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private AuthService: AuthService, private router: Router) { }

  isLoginMode: boolean = false;
  isLoading = false;
  error:string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    this.isLoading = true;

    let authObs:Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObs = this.AuthService.login(email, password)
    }
    else {
      authObs = this.AuthService.signUp(email, password)
    }

    authObs.subscribe(
      response => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/products']);
        console.log(response)
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    )

    form.reset();
  }
}
