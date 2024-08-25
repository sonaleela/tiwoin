import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollComponentFormComponent } from './payroll-component-form.component';

describe('PayrollComponentFormComponent', () => {
    let component: PayrollComponentFormComponent;
    let fixture: ComponentFixture<PayrollComponentFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PayrollComponentFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayrollComponentFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
