import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSiteControllerComponent } from './list-site-controller.component';

describe('ListSiteControllerComponent', () => {
    let component: ListSiteControllerComponent;
    let fixture: ComponentFixture<ListSiteControllerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListSiteControllerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListSiteControllerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
