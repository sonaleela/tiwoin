import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollListControllerComponent } from './payroll-list-controller.component';

describe('PayrollListControllerComponent', () => {
    let component: PayrollListControllerComponent;
    let fixture: ComponentFixture<PayrollListControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PayrollListControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayrollListControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
