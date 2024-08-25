import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListControllerComponent } from './user-list-controller.component';

describe('UserListControllerComponent', () => {
    let component: UserListControllerComponent;
    let fixture: ComponentFixture<UserListControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
