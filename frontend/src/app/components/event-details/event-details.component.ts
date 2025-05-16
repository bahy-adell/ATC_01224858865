import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-event-details',
  imports: [NavbarComponent, CurrencyPipe, DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  event: any = {};
  errorMessage: string = ""
  Message: string = ""
  tickets: number = 0;
  isAdmin!:boolean;
  constructor(
    private _EventService: EventService,
    private _bookingService: BookingService,
    private _authService:AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.isAdmin = this._authService.isAdmin();
   }

  loadEvent() {
    if (this.id && this.id.trim() !== '') {
      this.subscription = this._EventService.getOneEvent(this.id).subscribe({
        next: (res) => {
          this.event = res.data;
          console.log(this.event)
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }

  ngOnInit() {
    this.imgDomain = this._EventService.eventImages;
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this.loadEvent();
    });
 
  }
  delete(id :string){
    this._EventService.deleteEvent(id).subscribe({
      next: (res) => {
      },
      error: (err) => {
         this.errorMessage = err.error.message;
      }
    });
     
  }
  book(id: string) {
    this.subscription = this._bookingService.bookEvent(id).subscribe({
      next: (res) => {
      }, error: (err) => {
        console.log(err)
        this.errorMessage = err.error.message;
      }
    })
  }

  ngOnDestroy(): void { 
      this.subscription.unsubscribe(); 
  }
}
