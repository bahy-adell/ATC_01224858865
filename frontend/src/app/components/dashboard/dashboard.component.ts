import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from "../card/card.component";
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, RouterModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
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
