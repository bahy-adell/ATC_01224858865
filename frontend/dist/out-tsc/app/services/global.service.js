import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let GlobalService = class GlobalService {
    // hostName: string = 'http://localhost:3000';
    hostName = 'https://atc-01224858865-last.vercel.app';
    authRoute = '/api/auth';
    eventRoute = '/api/events';
    eventImages = `${this.hostName}`;
    bookRoute = '/api/booking';
    constructor() { }
};
GlobalService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GlobalService);
export { GlobalService };
