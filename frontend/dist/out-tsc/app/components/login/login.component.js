import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
let LoginComponent = class LoginComponent {
    fb;
    _AuthService;
    _Router;
    loginForm;
    submitted = false;
    invalidLogin = '';
    constructor(fb, _AuthService, _Router) {
        this.fb = fb;
        this._AuthService = _AuthService;
        this._Router = _Router;
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    login(loginForm) {
        this._AuthService.login(loginForm.value).subscribe({
            next: (res) => {
                if (res.token) {
                    localStorage.setItem('user', res.token);
                    this._AuthService.saveCurrentUser();
                }
                this._Router.navigate(['/home']);
            }, error: (err) => {
                this.invalidLogin = err.error.message;
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        imports: [RouterModule, ReactiveFormsModule, CommonModule],
        templateUrl: './login.component.html',
        styleUrl: './login.component.scss'
    })
], LoginComponent);
export { LoginComponent };
