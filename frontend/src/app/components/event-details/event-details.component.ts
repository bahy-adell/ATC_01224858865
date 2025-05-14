import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { EventService } from '../../services/event.service';

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

  constructor(private _EventService :EventService) { }

  loadevent() {
    this.subscription = this._EventService.getOneEvent(this.id).subscribe((res) => {
      this.event = res.data
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
