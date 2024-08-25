import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollControllerComponent } from './add-payroll-controller.component';

describe('AddPayrollControllerComponent', () => {
    let component: AddPayrollControllerComponent;
    let fixture: ComponentFixture<AddPayrollControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddPayrollControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPayrollControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
