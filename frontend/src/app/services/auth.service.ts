import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  _id: string;
  exp: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  hostName: string = '';
  routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.authRoute;
    if (localStorage.getItem('user') !== null) {
      this.saveCurrentUser()
    }
  }

  currentUser = new BehaviorSubject(null);


  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }


  checkToken() {
    const token: any = localStorage.getItem('user');
    if (!token) { return false }
    const decodedToken = jwtDecode<DecodedToken>(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
      this._Router.navigate(['/home'])
      return false;
    } else {
      return true;
    }
  }

  isAdmin() {
    const token: any = localStorage.getItem('user');
    if (!token) { return false }
    const decodedToken = jwtDecode<DecodedToken>(token);
    if (decodedToken.exp! < Date.now() / 1000) { return false }
    return decodedToken.role === 'admin';
  }

  singUp(myData: any): Observable<any> {
    // const headers = new HttpHeaders().set('Accept-Language', 'ar');
    // return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData ,{headers})
    return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData)
  }

  login(myData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/login`, myData)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this._Router.navigate(['/home']);
  }

}