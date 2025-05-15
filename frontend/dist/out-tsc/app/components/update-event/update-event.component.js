import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
let UpdateEventComponent = class UpdateEventComponent {
    fb;
    _EventService;
    _route;
    eventForm;
    subscription;
    selectedImage = null;
    event = {};
    id = "";
    errorMessage = "";
    resMessage = "";
    constructor(fb, _EventService, _route) {
        this.fb = fb;
        this._EventService = _EventService;
        this._route = _route;
        this.eventForm = this.fb.group({
            name: [null],
            description: [null],
            category: [null],
            date: [null],
            venue: [null],
            price: [null]
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file)
            this.selectedImage = file;
    }
    getEvent() {
        this._EventService.getOneEvent(this.id).subscribe({
            next: (res) => {
                this.event = res.data;
            },
            error: (err) => {
                console.error('Failed to fetch event', err);
            }
        });
    }
    onSubmit() {
        const formData = new FormData();
        Object.entries(this.eventForm.value).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                formData.append(key, value);
            }
        });
        if (this.selectedImage) {
            formData.append('image', this.selectedImage);
        }
        this._EventService.updateEvent(formData, this.id).subscribe({
            next: (res) => {
                this.resMessage = res.message;
            },
            error: (err) => {
                console.log(err);
                this.errorMessage = err.error.message;
            }
        });
    }
    ngOnInit() {
        this._route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.getEvent();
    }
    ngOnDestroy() { this.subscription.unsubscribe(); }
};
UpdateEventComponent = __decorate([
    Component({
        selector: 'app-update-event',
        imports: [NavbarComponent, ReactiveFormsModule],
        templateUrl: './update-event.component.html',
        styleUrl: './update-event.component.scss'
    })
], UpdateEventComponent);
export { UpdateEventComponent };
