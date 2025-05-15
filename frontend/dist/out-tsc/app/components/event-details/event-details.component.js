import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
let EventDetailsComponent = class EventDetailsComponent {
    _EventService;
    _bookingService;
    _authService;
    _router;
    _route;
    subscription;
    id = '';
    imgDomain = '';
    event = {};
    errorMessage = "";
    Message = "";
    tickets = 0;
    isAdmin;
    constructor(_EventService, _bookingService, _authService, _router, _route) {
        this._EventService = _EventService;
        this._bookingService = _bookingService;
        this._authService = _authService;
        this._router = _router;
        this._route = _route;
        this.isAdmin = this._authService.isAdmin();
    }
    loadEvent() {
        if (this.id && this.id.trim() !== '') {
            this.subscription = this._EventService.getOneEvent(this.id).subscribe({
                next: (res) => {
                    this.event = res.data;
                    console.log(this.event);
                }, error: (err) => {
                    console.log(err);
                }
            });
        }
    }
    ngOnInit() {
        this.imgDomain = this._EventService.eventImages;
        this._route.params.subscribe(params => {
            this.id = params['id'];
            this.loadEvent();
        });
    }
    delete(id) {
        this._EventService.deleteEvent(id).subscribe({
            next: (res) => {
            },
            error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
    book(id) {
        this.subscription = this._bookingService.bookEvent(id).subscribe({
            next: (res) => {
            }, error: (err) => {
                console.log(err);
                this.errorMessage = err.error.message;
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
EventDetailsComponent = __decorate([
    Component({
        selector: 'app-event-details',
        imports: [NavbarComponent, FooterComponent, CurrencyPipe, DatePipe],
        templateUrl: './event-details.component.html',
        styleUrl: './event-details.component.scss'
    })
], EventDetailsComponent);
export { EventDetailsComponent };
