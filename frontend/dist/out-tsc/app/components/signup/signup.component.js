import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../validators/password-match.validator';
let SignupComponent = class SignupComponent {
    fb;
    _AuthService;
    _Router;
    signupForm;
    submitted = false;
    emailErrors = '';
    passwordErrors = '';
    constructor(fb, _AuthService, _Router) {
        this.fb = fb;
        this._AuthService = _AuthService;
        this._Router = _Router;
        this.signupForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: passwordMatchValidator
        });
        this.signupForm.get('password')?.valueChanges.subscribe(() => {
            this.signupForm.get('confirmPassword')?.updateValueAndValidity();
        });
    }
    onSubmit() {
        this.submitted = true;
        if (this.signupForm.valid) {
            console.log('Form submitted:', this.signupForm.value);
        }
    }
    signup(signupForm) {
        this._AuthService.singUp(signupForm.value).subscribe({
            next: (res) => {
                this._Router.navigate(['/login']);
            }, error: (err) => {
                err.error.errors.map((error) => {
                    this.emailErrors = error.message;
                });
            }
        });
    }
};
SignupComponent = __decorate([
    Component({
        selector: 'app-signup',
        imports: [RouterModule, ReactiveFormsModule, CommonModule],
        templateUrl: './signup.component.html',
        styleUrl: './signup.component.scss'
    })
], SignupComponent);
export { SignupComponent };
