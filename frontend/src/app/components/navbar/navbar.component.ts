import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
isToken :boolean=false ;
isAdmin :boolean=false ;

constructor(private _AuthService :AuthService){}
logout(){
  this._AuthService.logout();
  window.location.href = '/home';
}
ngOnInit(): void {
this.isToken = this._AuthService.checkToken();
this.isAdmin = this._AuthService.isAdmin();
}
}
