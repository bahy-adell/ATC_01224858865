import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
let NavbarComponent = class NavbarComponent {
    _AuthService;
    isToken = false;
    isAdmin = false;
    constructor(_AuthService) {
        this._AuthService = _AuthService;
    }
    logout() {
        this._AuthService.logout();
        window.location.href = '/home';
    }
    ngOnInit() {
        this.isToken = this._AuthService.checkToken();
        this.isAdmin = this._AuthService.isAdmin();
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        imports: [CommonModule, RouterLink],
        templateUrl: './navbar.component.html',
        styleUrl: './navbar.component.scss'
    })
], NavbarComponent);
export { NavbarComponent };
