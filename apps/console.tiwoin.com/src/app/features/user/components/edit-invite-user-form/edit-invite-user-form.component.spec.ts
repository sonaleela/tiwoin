import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInviteUserFormComponent } from './edit-invite-user-form.component';

describe('EditInviteUserFormComponent', () => {
  let component: EditInviteUserFormComponent;
  let fixture: ComponentFixture<EditInviteUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInviteUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInviteUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
