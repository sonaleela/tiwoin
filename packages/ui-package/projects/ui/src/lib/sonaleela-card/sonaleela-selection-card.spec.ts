import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonaleelaSelectionCardComponent } from './sonaleela-selection-card';

describe('SonaleelaSelectionCardComponent', () => {
    let component: SonaleelaSelectionCardComponent;
    let fixture: ComponentFixture<SonaleelaSelectionCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SonaleelaSelectionCardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SonaleelaSelectionCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
