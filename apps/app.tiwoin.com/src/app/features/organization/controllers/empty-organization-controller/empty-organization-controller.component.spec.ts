import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrganizationControllerComponent } from './empty-organization-controller.component';

describe('EmptyOrganizationControllerComponent', () => {
  let component: EmptyOrganizationControllerComponent;
  let fixture: ComponentFixture<EmptyOrganizationControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyOrganizationControllerComponent]
    });
    fixture = TestBed.createComponent(EmptyOrganizationControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
