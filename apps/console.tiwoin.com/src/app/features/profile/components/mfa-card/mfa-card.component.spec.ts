import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaCardComponent } from './mfa-card.component';

describe('MfaCardComponent', () => {
    let component: MfaCardComponent;
    let fixture: ComponentFixture<MfaCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MfaCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MfaCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
