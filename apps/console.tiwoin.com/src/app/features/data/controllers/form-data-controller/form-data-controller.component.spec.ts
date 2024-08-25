import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataControllerComponent } from './form-data-controller.component';

describe('FormDataControllerComponent', () => {
  let component: FormDataControllerComponent;
  let fixture: ComponentFixture<FormDataControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
