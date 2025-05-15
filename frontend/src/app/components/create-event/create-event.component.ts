import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-create-event',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
 eventForm: FormGroup;
  selectedImage: File | null = null;
  errorMessage ="" ;

  constructor(private fb: FormBuilder ,private _EventService:EventService) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) this.selectedImage = file;
  }

  onSubmit(){
    if (this.eventForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.eventForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
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
        this.errorMessage =err.error.message;
      }
    });
  }
}
