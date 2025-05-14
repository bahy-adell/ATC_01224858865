import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  hostName: string = 'http://localhost:3000';
  authRoute: string = '/api/auth';
  eventRoute:string= '/api/events';
  eventImages: string = `${this.hostName}`
  // cardRoute:string= '/api/cards';
  // certificatesRoute:string= '/api/certificates';

  constructor() { }

}