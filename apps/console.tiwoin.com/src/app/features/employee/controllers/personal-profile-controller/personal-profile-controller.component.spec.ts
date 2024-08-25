import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfileControllerComponent } from './personal-profile-controller.component';

describe('PersonalProfileControllerComponent', () => {
    let component: PersonalProfileControllerComponent;
    let fixture: ComponentFixture<PersonalProfileControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalProfileControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalProfileControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
