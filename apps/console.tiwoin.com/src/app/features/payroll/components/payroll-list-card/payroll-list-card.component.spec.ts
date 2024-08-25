import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollListCardComponent } from './payroll-list-card.component';

describe('PayrollListCardComponent', () => {
    let component: PayrollListCardComponent;
    let fixture: ComponentFixture<PayrollListCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PayrollListCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PayrollListCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
