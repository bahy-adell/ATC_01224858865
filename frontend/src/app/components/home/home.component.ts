import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, RouterModule, CardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private _eventService: EventService, private _AuthService: AuthService) { }

  subscription: any;
  imgDomain: string = '';
  events: any[] = [];


  ngOnInit(): void {
    this._AuthService.checkToken();

    this.imgDomain = this._eventService.eventImages;
    console.log(this.imgDomain);
    this.subscription = this._eventService.getevents(8, 1).subscribe((res) => {
      this.events = res.data;
      console.log(this.events);
      console.log(this.imgDomain + this.events[0].image);
    })
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }

}
