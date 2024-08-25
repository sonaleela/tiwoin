import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimeLeavePageComponent } from './employee-time-leave-page.component';

describe('EmployeeTimeLeavePageComponent', () => {
    let component: EmployeeTimeLeavePageComponent;
    let fixture: ComponentFixture<EmployeeTimeLeavePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeeTimeLeavePageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeTimeLeavePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
