import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListControllerComponent } from './site-list-controller.component';

describe('SiteListControllerComponent', () => {
  let component: SiteListControllerComponent;
  let fixture: ComponentFixture<SiteListControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteListControllerComponent]
    });
    fixture = TestBed.createComponent(SiteListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
