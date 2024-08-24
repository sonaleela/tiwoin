import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyOrganizationPageComponent } from './empty-organization-page.component';

describe('EmptyOrganizationPageComponent', () => {
  let component: EmptyOrganizationPageComponent;
  let fixture: ComponentFixture<EmptyOrganizationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyOrganizationPageComponent]
    });
    fixture = TestBed.createComponent(EmptyOrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
