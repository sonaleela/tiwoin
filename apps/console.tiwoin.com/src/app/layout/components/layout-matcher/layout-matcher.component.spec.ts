import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMatcherComponent } from './layout-matcher.component';

describe('LayoutMatcherComponent', () => {
    let component: LayoutMatcherComponent;
    let fixture: ComponentFixture<LayoutMatcherComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutMatcherComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutMatcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
