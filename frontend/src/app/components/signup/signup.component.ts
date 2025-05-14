import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  emailErrors: string = '';
  passwordErrors: string = '';
  constructor(private fb: FormBuilder ,private _AuthService :AuthService, private _Router: Router) {
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
  signup(signupForm: FormGroup) {
    this._AuthService.singUp(signupForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/login'])
      }, error: (err) => {
        err.error.errors.map((error: any) => {
          this.emailErrors = error.message;
        })
      }
    })
  }

}
