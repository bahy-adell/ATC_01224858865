import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let BookingService = class BookingService {
    _HttpClient;
    _GlobalService;
    hostName = '';
    routeName = '';
    constructor(_HttpClient, _GlobalService) {
        this._HttpClient = _HttpClient;
        this._GlobalService = _GlobalService;
        this.hostName = this._GlobalService.hostName;
        this.routeName = this._GlobalService.bookRoute;
        ;
    }
    bookEvent(id) {
        return this._HttpClient.post(`${this.hostName}${this.routeName}/${id}`, null, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    getUserTickets() {
        return this._HttpClient.get(`${this.hostName}${this.routeName}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    deleteTicket(id) {
        return this._HttpClient.delete(`${this.hostName}${this.routeName}/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
};
BookingService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BookingService);
export { BookingService };
