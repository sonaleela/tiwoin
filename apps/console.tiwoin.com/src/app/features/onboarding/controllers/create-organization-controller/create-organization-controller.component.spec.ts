import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganizationControllerComponent } from './create-organization-controller.component';

describe('CreateOrganizationControllerComponent', () => {
    let component: CreateOrganizationControllerComponent;
    let fixture: ComponentFixture<CreateOrganizationControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateOrganizationControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateOrganizationControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
