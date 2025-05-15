import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from "../card/card.component";
import { Pagination } from '../../interfaces/pagination';


@Component({
  selector: 'app-all-events',
  imports: [NavbarComponent, FooterComponent, RouterModule, CardComponent],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.scss'
})
export class AllEventsComponent implements OnInit, OnDestroy {
  constructor(private _eventService: EventService, private _AuthService: AuthService) { }

  subscription: any;
  imgDomain: string = '';
  events: any[] = [];
  page: number = 1;
  pagination: Pagination = {};
  category: string = "";
  errorMessage: string = "";
  loadEvents() {
    this.subscription = this._eventService.getevents(4, this.page, this.category).subscribe({
      next: (res) => {
        this.events = res.data;
        this.pagination = res.pagination
        this.errorMessage = " ";
      }, error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadEvents();
    window.scrollTo({ top: 800, behavior: 'smooth' });
  }
  setCategory(category: string) {
    this.category = category;
    this.page = 1;
    this.loadEvents();
  }
  ngOnInit(): void {
    this._AuthService.checkToken();
    this.imgDomain = this._eventService.eventImages;

    this.loadEvents();

  }

  ngOnDestroy(): void { this.subscription.unsubscribe() }

}
