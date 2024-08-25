import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProfileCardComponent } from './general-profile-card.component';

describe('GeneralProfileCardComponent', () => {
    let component: GeneralProfileCardComponent;
    let fixture: ComponentFixture<GeneralProfileCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GeneralProfileCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GeneralProfileCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
