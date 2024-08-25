import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteControllerComponent } from './create-site-controller.component';

describe('CreateSiteControllerComponent', () => {
    let component: CreateSiteControllerComponent;
    let fixture: ComponentFixture<CreateSiteControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateSiteControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateSiteControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
