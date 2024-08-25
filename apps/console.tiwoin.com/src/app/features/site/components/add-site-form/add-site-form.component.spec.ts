import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteFormComponent } from './add-site-form.component';

describe('AddSiteFormComponent', () => {
    let component: AddSiteFormComponent;
    let fixture: ComponentFixture<AddSiteFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddSiteFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSiteFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
