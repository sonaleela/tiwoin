import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrganizationComponent } from './empty-organization.component';

describe('EmptyOrganizationComponent', () => {
  let component: EmptyOrganizationComponent;
  let fixture: ComponentFixture<EmptyOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyOrganizationComponent]
    });
    fixture = TestBed.createComponent(EmptyOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
