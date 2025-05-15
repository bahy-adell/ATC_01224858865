import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
let AuthService = class AuthService {
    _HttpClient;
    _Router;
    _GlobalService;
    hostName = '';
    routeName = '';
    constructor(_HttpClient, _Router, _GlobalService) {
        this._HttpClient = _HttpClient;
        this._Router = _Router;
        this._GlobalService = _GlobalService;
        this.hostName = this._GlobalService.hostName;
        this.routeName = this._GlobalService.authRoute;
        if (localStorage.getItem('user') !== null) {
            this.saveCurrentUser();
        }
    }
    currentUser = new BehaviorSubject(null);
    saveCurrentUser() {
        const token = localStorage.getItem('user');
        this.currentUser.next(jwtDecode(token));
    }
    checkToken() {
        const token = localStorage.getItem('user');
        if (!token) {
            return false;
        }
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            this.logout();
            this._Router.navigate(['/home']);
            return false;
        }
        else {
            return true;
        }
    }
    isAdmin() {
        const token = localStorage.getItem('user');
        if (!token) {
            return false;
        }
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
            return false;
        }
        return decodedToken.role === 'admin';
    }
    singUp(myData) {
        // const headers = new HttpHeaders().set('Accept-Language', 'ar');
        // return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData ,{headers})
        return this._HttpClient.post(`${this.hostName}${this.routeName}/signup`, myData);
    }
    login(myData) {
        return this._HttpClient.post(`${this.hostName}${this.routeName}/login`, myData);
    }
    logout() {
        localStorage.removeItem('user');
        this.currentUser.next(null);
        this._Router.navigate(['/home']);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
