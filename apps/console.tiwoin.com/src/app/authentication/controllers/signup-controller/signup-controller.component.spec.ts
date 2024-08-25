import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupControllerComponent } from './signup-controller.component';

describe('SignupControllerComponent', () => {
    let component: SignupControllerComponent;
    let fixture: ComponentFixture<SignupControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SignupControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
