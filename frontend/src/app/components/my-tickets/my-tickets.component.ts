import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CustomeDatePipe } from '../../pipes/custome-date.pipe';


@Component({
  selector: 'app-my-tickets',
  imports: [NavbarComponent, CustomeDatePipe],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss'
})
export class MyTicketsComponent implements OnInit, OnDestroy {
  constructor(private _bookingService: BookingService, private _eventService: EventService,private _router: Router, private _AuthService: AuthService) { }

  subscription: any;
  imgDomain: string = '';
  event: any = {};
  tickets: any[] = [];
  eventId: string = "";

  errorMessage: string = "";
  loadTickets() {
    this.subscription = this._bookingService.getUserTickets().subscribe({
      next: (res) => {
        this.tickets = res.data;
        console.log(this.tickets);
      }, error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }

   routeTo(id: string) {
    this._router.navigate(['/event-details', id]);
  }

  deleteTicket(id:string){
     this.subscription = this._bookingService.deleteTicket(id).subscribe({
      next: (res) => {
       this._router.navigate(['/home']);
      }, error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }
  ngOnInit(): void {
    this._AuthService.checkToken();
    this.imgDomain = this._eventService.eventImages;
    this.loadTickets();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }

}
