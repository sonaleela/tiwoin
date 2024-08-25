import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSitePageComponent } from './list-site-page.component';

describe('ListSitePageComponent', () => {
    let component: ListSitePageComponent;
    let fixture: ComponentFixture<ListSitePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListSitePageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListSitePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
