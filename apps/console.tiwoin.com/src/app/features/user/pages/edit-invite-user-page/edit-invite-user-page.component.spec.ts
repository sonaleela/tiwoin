import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInviteUserPageComponent } from './edit-invite-user-page.component';

describe('EditInviteUserPageComponent', () => {
  let component: EditInviteUserPageComponent;
  let fixture: ComponentFixture<EditInviteUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInviteUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInviteUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
