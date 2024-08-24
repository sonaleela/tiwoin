import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonaleelaButtonComponent } from './sonaleela-button';

describe('SonaleelaCtaButtonComponent', () => {
    let component: SonaleelaButtonComponent;
    let fixture: ComponentFixture<SonaleelaButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SonaleelaButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SonaleelaButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
