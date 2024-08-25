import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollFormComponent } from './add-payroll-form.component';

describe('AddPayrollFormComponent', () => {
    let component: AddPayrollFormComponent;
    let fixture: ComponentFixture<AddPayrollFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddPayrollFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPayrollFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
