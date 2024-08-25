import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserControllerComponent } from './invite-user-controller.component';

describe('InviteUserControllerComponent', () => {
  let component: InviteUserControllerComponent;
  let fixture: ComponentFixture<InviteUserControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteUserControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteUserControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
