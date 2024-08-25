import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteControllerComponent } from './add-site-controller.component';

describe('AddSiteControllerComponent', () => {
    let component: AddSiteControllerComponent;
    let fixture: ComponentFixture<AddSiteControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddSiteControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSiteControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
