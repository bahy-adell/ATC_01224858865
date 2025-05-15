import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  hostName: string = 'http://localhost:3000';
  // hostName: string = 'https://atc-01224858865-last.vercel.app';
  authRoute: string = '/api/auth';
  eventRoute:string= '/api/events';
  eventImages: string = `${this.hostName}`
  bookRoute:string= '/api/booking';

  constructor() { }

}