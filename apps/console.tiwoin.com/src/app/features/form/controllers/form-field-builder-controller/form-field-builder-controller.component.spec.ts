import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldBuilderControllerComponent } from './form-field-builder-controller.component';

describe('FormFieldBuilderControllerComponent', () => {
  let component: FormFieldBuilderControllerComponent;
  let fixture: ComponentFixture<FormFieldBuilderControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldBuilderControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldBuilderControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
