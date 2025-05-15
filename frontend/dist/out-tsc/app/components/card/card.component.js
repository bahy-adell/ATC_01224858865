import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { RouterLink } from '@angular/router';
let CardComponent = class CardComponent {
    _eventService;
    _authService;
    _location;
    _router;
    event;
    imgDomain = '';
    isAdmin = false;
    atDashboard = false;
    constructor(_eventService, _authService, _location, _router) {
        this._eventService = _eventService;
        this._authService = _authService;
        this._location = _location;
        this._router = _router;
        this.imgDomain = this._eventService.eventImages;
        this.isAdmin = this._authService.isAdmin();
        this.atDashboard = this._location.path().includes('/dashboard');
    }
    book(id) {
        this._router.navigate(['/event-details', id]);
    }
    update(id) {
        this._router.navigate(['/update-event', id]);
    }
    delete(id) {
        this._router.navigate(['/event-details', id]);
    }
};
__decorate([
    Input()
], CardComponent.prototype, "event", void 0);
CardComponent = __decorate([
    Component({
        selector: 'app-card',
        imports: [CurrencyPipe, DatePipe, DescriptionPipe, RouterLink],
        templateUrl: './card.component.html',
        styleUrl: './card.component.scss'
    })
], CardComponent);
export { CardComponent };
