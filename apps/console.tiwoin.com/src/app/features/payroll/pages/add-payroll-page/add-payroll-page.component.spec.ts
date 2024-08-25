import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrollPageComponent } from './add-payroll-page.component';

describe('AddPayrollPageComponent', () => {
    let component: AddPayrollPageComponent;
    let fixture: ComponentFixture<AddPayrollPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddPayrollPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPayrollPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
