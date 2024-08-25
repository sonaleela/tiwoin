import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitePageComponent } from './add-site-page.component';

describe('AddSitePageComponent', () => {
    let component: AddSitePageComponent;
    let fixture: ComponentFixture<AddSitePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddSitePageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSitePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
