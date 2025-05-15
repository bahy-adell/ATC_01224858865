import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { authGuard } from './guards/auth.guard';
// import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: AllEventsComponent },
    { path: 'event-details/:id', canActivate: [authGuard], component: EventDetailsComponent },
    { path: 'all-events', component: AllEventsComponent },
    { path: 'my-tickets', canActivate : [authGuard],component: MyTicketsComponent },
    { path: 'dashboard', canActivate : [authGuard,adminGuard],component: DashboardComponent },
    { path: 'create-event', canActivate : [authGuard,adminGuard],component: CreateEventComponent },
    { path: 'update-event/:id', canActivate : [authGuard,adminGuard],component: UpdateEventComponent },


    { path: '**', redirectTo: '/home' }
];