import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe } from '@angular/common';
let MyTicketsComponent = class MyTicketsComponent {
    _bookingService;
    _eventService;
    _router;
    _AuthService;
    constructor(_bookingService, _eventService, _router, _AuthService) {
        this._bookingService = _bookingService;
        this._eventService = _eventService;
        this._router = _router;
        this._AuthService = _AuthService;
    }
    subscription;
    imgDomain = '';
    event = {};
    tickets = [];
    eventId = "";
    errorMessage = "";
    loadTickets() {
        this.subscription = this._bookingService.getUserTickets().subscribe({
            next: (res) => {
                this.tickets = res.data;
                console.log(this.tickets);
            }, error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
    routeTo(id) {
        this._router.navigate(['/event-details', id]);
    }
    deleteTicket(id) {
        this.subscription = this._bookingService.deleteTicket(id).subscribe({
            next: (res) => {
                this._router.navigate(['/home']);
            }, error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
    ngOnInit() {
        this._AuthService.checkToken();
        this.imgDomain = this._eventService.eventImages;
        this.loadTickets();
    }
    ngOnDestroy() { this.subscription.unsubscribe(); }
};
MyTicketsComponent = __decorate([
    Component({
        selector: 'app-my-tickets',
        imports: [NavbarComponent, DatePipe],
        templateUrl: './my-tickets.component.html',
        styleUrl: './my-tickets.component.scss'
    })
], MyTicketsComponent);
export { MyTicketsComponent };
