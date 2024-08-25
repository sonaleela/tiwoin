import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormControllerComponent } from './edit-form-controller.component';

describe('EditFormControllerComponent', () => {
  let component: EditFormControllerComponent;
  let fixture: ComponentFixture<EditFormControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
