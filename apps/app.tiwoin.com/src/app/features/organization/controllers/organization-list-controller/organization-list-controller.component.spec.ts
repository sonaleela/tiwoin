import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationListControllerComponent } from './organization-list-controller.component';

describe('OrganizationListControllerComponent', () => {
  let component: OrganizationListControllerComponent;
  let fixture: ComponentFixture<OrganizationListControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationListControllerComponent]
    });
    fixture = TestBed.createComponent(OrganizationListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
