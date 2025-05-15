import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent  implements OnInit, OnDestroy  {
  eventForm: FormGroup;
  subscription: any;
  selectedImage: File | null = null;
  event: any = {};
  id="";
  errorMessage ="" ;
 resMessage ="" ;


  constructor(private fb: FormBuilder ,private _EventService:EventService ,private _route: ActivatedRoute) {
    this.eventForm = this.fb.group({
      name: [null],
      description: [null],
      category: [null],
      date: [null],
      venue: [null],
      price: [null]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) this.selectedImage = file;
  }

  getEvent() {
    this._EventService.getOneEvent(this.id).subscribe({
      next: (res) => {
        this.event = res.data
      },
      error: (err) => {
        console.error('Failed to fetch event', err);
      }
    });
  }
  onSubmit(){
    const formData = new FormData();
    Object.entries(this.eventForm.value).forEach(([key, value]) => {
    if (value !== null && value !== '') {
      formData.append(key, value as string);
    }
    });

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    this._EventService.updateEvent(formData ,this.id).subscribe({
      next: (res) => {
        this.resMessage = res.message

      },
      error: (err) => {
        console.log(err)
        this.errorMessage =err.error.message;
      }
    });
  }

  ngOnInit() {
  this._route.params.subscribe(params => {
      this.id = params['id'];
  })
  this.getEvent() ;
  }

  ngOnDestroy(){ this.subscription.unsubscribe() }

}
