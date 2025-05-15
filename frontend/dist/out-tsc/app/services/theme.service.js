import { __decorate, __param } from "tslib";
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
let ThemeService = class ThemeService {
    platformId;
    isDarkMode = new BehaviorSubject(false);
    isDarkMode$ = this.isDarkMode.asObservable();
    constructor(platformId) {
        this.platformId = platformId;
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.setTheme(savedTheme === 'dark');
            }
            else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.setTheme(prefersDark);
            }
        }
    }
    setTheme(isDark) {
        this.isDarkMode.next(isDark);
        if (isPlatformBrowser(this.platformId)) {
            document.documentElement.style.setProperty('--primary', isDark ? 'var(--dark-primary)' : 'var(--light-primary)');
            document.documentElement.style.setProperty('--secondary', isDark ? 'var(--dark-secondary)' : 'var(--light-secondary)');
            document.documentElement.style.setProperty('--background', isDark ? 'var(--dark-background)' : 'var(--light-background)');
            document.documentElement.style.setProperty('--surface', isDark ? 'var(--dark-surface)' : 'var(--light-surface)');
            document.documentElement.style.setProperty('--border', isDark ? 'var(--dark-border)' : 'var(--light-border)');
            document.documentElement.style.setProperty('--text-primary', isDark ? 'var(--dark-text-primary)' : 'var(--light-text-primary)');
            document.documentElement.style.setProperty('--text-secondary', isDark ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)');
            document.documentElement.style.setProperty('--text-tertiary', isDark ? 'var(--dark-text-tertiary)' : 'var(--light-text-tertiary)');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    }
    toggleTheme() {
        this.setTheme(!this.isDarkMode.value);
    }
};
ThemeService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(PLATFORM_ID))
], ThemeService);
export { ThemeService };
