import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let DataService = class DataService {
    eventIdSource = new BehaviorSubject("");
    currentId = this.eventIdSource.asObservable();
    setEventID(id) {
        this.eventIdSource.next(id);
        console.log(this.currentId + "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
