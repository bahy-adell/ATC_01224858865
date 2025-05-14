import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  invalidLogin: string = '';
  constructor(private fb: FormBuilder ,private _AuthService: AuthService, private _Router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  login(loginForm: FormGroup) {
    this._AuthService.login(loginForm.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token)
          this._AuthService.saveCurrentUser()
        }
        this._Router.navigate(['/home'])
      }, error: (err) => {
        this.invalidLogin = err.error.message
      }
    })
  }

}
