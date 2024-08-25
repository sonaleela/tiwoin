import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardControllerComponent } from './dashboard-controller.component';

describe('DashboardControllerComponent', () => {
  let component: DashboardControllerComponent;
  let fixture: ComponentFixture<DashboardControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardControllerComponent]
    });
    fixture = TestBed.createComponent(DashboardControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
