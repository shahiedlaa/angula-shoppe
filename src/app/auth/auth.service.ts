import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user-model";

export interface AuthResponseData {
  idToken: string,
  email: string,
  resfreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXLjGli8g379aUx2A7hzdBosOdq0f163U', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXLjGli8g379aUx2A7hzdBosOdq0f163U', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
  }

  handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return
    }
    const loadedUser = new User(userData.email, userData.userId, userData._token, new Date(userData._expirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      let expirationTime = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime)
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = 'Unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists!'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password!'
        break
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid Email/Password!'
        break
    }
    return throwError(errorMessage);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(
      () => {this.logOut()}, expirationTime
    )
  }

}
