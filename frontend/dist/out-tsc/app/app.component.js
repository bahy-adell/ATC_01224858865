import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
let AppComponent = class AppComponent {
    title = 'EventHup';
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        imports: [RouterOutlet, ThemeToggleComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.scss'
    })
], AppComponent);
export { AppComponent };
