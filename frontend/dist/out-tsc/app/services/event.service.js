import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let EventService = class EventService {
    _HttpClient;
    _GlobalService;
    hostName = '';
    routeName = '';
    eventImages = ``;
    constructor(_HttpClient, _GlobalService) {
        this._HttpClient = _HttpClient;
        this._GlobalService = _GlobalService;
        this.hostName = this._GlobalService.hostName;
        this.routeName = this._GlobalService.eventRoute;
        this.eventImages = this._GlobalService.eventImages;
    }
    getevents(limit = 8, page = 1, category) {
        if (category && category !== "") {
            return this._HttpClient.get(`${this.hostName}${this.routeName}?category=${category}&limit=${limit}&page=${page}`);
        }
        else {
            return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}`);
        }
    }
    getOneEvent(id) {
        return this._HttpClient.get(`${this.hostName}${this.routeName}/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    createEvent(data) {
        return this._HttpClient.post(`${this.hostName}${this.routeName}`, data, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    updateEvent(data, id) {
        return this._HttpClient.put(`${this.hostName}${this.routeName}/${id}`, data, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
    deleteEvent(id) {
        return this._HttpClient.delete(`${this.hostName}${this.routeName}/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('user')}` } });
    }
};
EventService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EventService);
export { EventService };
