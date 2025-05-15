import { TestBed } from '@angular/core/testing';
import { EventDetailsComponent } from './event-details.component';
describe('EventDetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EventDetailsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EventDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
