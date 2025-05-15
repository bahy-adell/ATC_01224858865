import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EventService } from '../../services/event.service';
import { DataService } from '../../services/data.service';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  subscription: any;
  id: string = '';
  imgDomain: string = '';
  event: any = {};
  errorMessage: string = ""
  tickets: number = 0;

  constructor(private _EventService: EventService, private _bookingService: BookingService, private _router: Router, private _dataService: DataService) { }

  loadEvent() {
    this.subscription = this._EventService.getOneEvent(this.id).subscribe({
      next: (res) => {
        this.event = res.data;
        console.log(this.event)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  loadTickets() {
    this.subscription = this._bookingService.getUserTickets().subscribe({
      next: (res) => {
        this.tickets = res.data.NumOfTickets;
        console.log(this.tickets);
      }
    })
  }

  ngOnInit(): void {
    this.imgDomain = this._EventService.eventImages;
    this._dataService.currentId.subscribe((id: string) => {
      this.id = id;
      this.loadEvent();
      this.loadTickets();
    });
  }
  book(id: string) {
    this.subscription = this._bookingService.bookEvent(id).subscribe({
      next: (res) => {
        this._router.navigate(['/home']);
      }, error: (err) => {
        console.log(err)
        this.errorMessage = err.error.message;
      }
    })
  }


  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
