import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonaleelaFormFieldComponent } from './sonaleela-form-field';

describe('SonaleelaFormFieldComponent', () => {
    let component: SonaleelaFormFieldComponent;
    let fixture: ComponentFixture<SonaleelaFormFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SonaleelaFormFieldComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SonaleelaFormFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
