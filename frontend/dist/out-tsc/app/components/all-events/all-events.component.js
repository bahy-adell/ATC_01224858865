import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../card/card.component";
let AllEventsComponent = class AllEventsComponent {
    _eventService;
    _AuthService;
    constructor(_eventService, _AuthService) {
        this._eventService = _eventService;
        this._AuthService = _AuthService;
    }
    subscription;
    imgDomain = '';
    events = [];
    page = 1;
    pagination = {};
    category = "";
    errorMessage = "";
    loadEvents() {
        this.subscription = this._eventService.getevents(4, this.page, this.category).subscribe({
            next: (res) => {
                this.events = res.data;
                this.pagination = res.pagination;
                this.errorMessage = " ";
            }, error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
    changePage(page) {
        this.page = page;
        this.loadEvents();
        window.scrollTo({ top: 800, behavior: 'smooth' });
    }
    setCategory(category) {
        this.category = category;
        this.page = 1;
        this.loadEvents();
    }
    ngOnInit() {
        this._AuthService.checkToken();
        this.imgDomain = this._eventService.eventImages;
        this.loadEvents();
    }
    ngOnDestroy() { this.subscription.unsubscribe(); }
};
AllEventsComponent = __decorate([
    Component({
        selector: 'app-all-events',
        imports: [NavbarComponent, FooterComponent, RouterModule, CardComponent],
        templateUrl: './all-events.component.html',
        styleUrl: './all-events.component.scss'
    })
], AllEventsComponent);
export { AllEventsComponent };
