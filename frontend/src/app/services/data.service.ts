import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private eventIdSource = new BehaviorSubject<string>("");
  currentId = this.eventIdSource.asObservable();
  setEventID(id: string) {
    this.eventIdSource.next(id);
  }

}