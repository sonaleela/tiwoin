import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninControllerComponent } from './signin-controller.component';

describe('SigninControllerComponent', () => {
    let component: SigninControllerComponent;
    let fixture: ComponentFixture<SigninControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SigninControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
