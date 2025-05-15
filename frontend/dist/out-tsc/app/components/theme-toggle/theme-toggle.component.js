import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
let ThemeToggleComponent = class ThemeToggleComponent {
    themeService;
    isDarkMode = false;
    constructor(themeService) {
        this.themeService = themeService;
    }
    ngOnInit() {
        this.themeService.isDarkMode$.subscribe(isDark => {
            this.isDarkMode = isDark;
        });
    }
    toggleTheme() {
        this.themeService.toggleTheme();
    }
};
ThemeToggleComponent = __decorate([
    Component({
        selector: 'app-theme-toggle',
        imports: [CommonModule],
        templateUrl: './theme-toggle.component.html',
        styleUrl: './theme-toggle.component.scss'
    })
], ThemeToggleComponent);
export { ThemeToggleComponent };
