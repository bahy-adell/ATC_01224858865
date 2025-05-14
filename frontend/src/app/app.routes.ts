import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: AllEventsComponent },
    { path: 'event-details',canActivate : [authGuard], component: EventDetailsComponent },
    { path: 'all-events', component: AllEventsComponent },
    { path: '**', redirectTo: '/home' }
];