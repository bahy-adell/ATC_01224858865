import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private isDarkMode = new BehaviorSubject<boolean>(false);
    isDarkMode$ = this.isDarkMode.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.setTheme(savedTheme === 'dark');
            } else {
                
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.setTheme(prefersDark);
            }
        }
    }

    setTheme(isDark: boolean) {
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
} 