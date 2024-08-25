import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDataControllerComponent } from './edit-form-data-controller.component';

describe('EditFormDataControllerComponent', () => {
  let component: EditFormDataControllerComponent;
  let fixture: ComponentFixture<EditFormDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFormDataControllerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFormDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
