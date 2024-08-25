import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInviteUserControllerComponent } from './edit-invite-user-controller.component';

describe('EditInviteUserControllerComponent', () => {
  let component: EditInviteUserControllerComponent;
  let fixture: ComponentFixture<EditInviteUserControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInviteUserControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInviteUserControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
