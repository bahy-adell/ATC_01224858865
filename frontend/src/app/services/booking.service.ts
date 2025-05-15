import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private hostName: string = ''
  private routeName: string = ''

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.bookRoute;
  ;
  }

  bookEvent(id: string): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}/${id}`,null,{ headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
  getUserTickets(): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}`,{ headers: { authorization: `Bearer ${localStorage.getItem('user')}` } })
  }
}