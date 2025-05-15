import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
let CreateEventComponent = class CreateEventComponent {
    fb;
    _EventService;
    eventForm;
    selectedImage = null;
    errorMessage = "";
    constructor(fb, _EventService) {
        this.fb = fb;
        this._EventService = _EventService;
        this.eventForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            date: ['', Validators.required],
            venue: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]]
        });
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file)
            this.selectedImage = file;
    }
    onSubmit() {
        if (this.eventForm.invalid)
            return;
        const formData = new FormData();
        Object.entries(this.eventForm.value).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (this.selectedImage) {
            formData.append('image', this.selectedImage);
        }
        this._EventService.createEvent(formData).subscribe({
            next: (res) => {
                console.log('Event created:', res);
                this.eventForm.reset();
            },
            error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
};
CreateEventComponent = __decorate([
    Component({
        selector: 'app-create-event',
        imports: [ReactiveFormsModule, NavbarComponent],
        templateUrl: './create-event.component.html',
        styleUrl: './create-event.component.scss'
    })
], CreateEventComponent);
export { CreateEventComponent };
