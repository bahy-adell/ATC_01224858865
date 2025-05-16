import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DescriptionPipe } from '../../pipes/description.pipe';
import {  Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, DatePipe, DescriptionPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() event: any;
  imgDomain: string = '';
  isAdmin: boolean = false;
  atDashboard: boolean = false;

  constructor(
    private _eventService: EventService,
    private _authService: AuthService,
    private _location: Location,
    private _router: Router
  ) {
    this.imgDomain = this._eventService.eventImages;
    this.isAdmin = this._authService.isAdmin();
    this.atDashboard = this._location.path().includes('/dashboard');
  }
  
  book(id: string) {
    this._router.navigate(['/event-details', id]);
  }
  update(id: string) {
    this._router.navigate(['/update-event', id]);
  }
  delete(id :string){
    
    this._router.navigate(['/event-details', id]);
  }
  }

