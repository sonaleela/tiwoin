import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLeaveControllerComponent } from './time-leave-controller.component';

describe('TimeLeaveControllerComponent', () => {
    let component: TimeLeaveControllerComponent;
    let fixture: ComponentFixture<TimeLeaveControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeLeaveControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLeaveControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
