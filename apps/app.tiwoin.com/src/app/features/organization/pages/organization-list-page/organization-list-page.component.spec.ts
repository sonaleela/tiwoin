import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationListPageComponent } from './organization-list-page.component';

describe('OrganizationListPageComponent', () => {
  let component: OrganizationListPageComponent;
  let fixture: ComponentFixture<OrganizationListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationListPageComponent]
    });
    fixture = TestBed.createComponent(OrganizationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
