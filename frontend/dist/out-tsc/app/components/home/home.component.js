import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';
let HomeComponent = class HomeComponent {
    _eventService;
    _AuthService;
    constructor(_eventService, _AuthService) {
        this._eventService = _eventService;
        this._AuthService = _AuthService;
    }
    subscription;
    imgDomain = '';
    events = [];
    ngOnInit() {
        this._AuthService.checkToken();
        this.imgDomain = this._eventService.eventImages;
        console.log(this.imgDomain);
        this.subscription = this._eventService.getevents(8, 1).subscribe((res) => {
            this.events = res.data;
            console.log(this.events);
            console.log(this.imgDomain + this.events[0].image);
        });
    }
    ngOnDestroy() { this.subscription.unsubscribe(); }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        imports: [NavbarComponent, FooterComponent, RouterModule, CardComponent, RouterLink],
        templateUrl: './home.component.html',
        styleUrl: './home.component.scss'
    })
], HomeComponent);
export { HomeComponent };
