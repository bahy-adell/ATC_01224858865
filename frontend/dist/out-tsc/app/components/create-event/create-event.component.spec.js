import { TestBed } from '@angular/core/testing';
import { CreateEventComponent } from './create-event.component';
describe('CreateEventComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEventComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CreateEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
