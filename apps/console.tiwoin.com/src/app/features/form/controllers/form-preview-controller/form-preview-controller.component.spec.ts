import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreviewControllerComponent } from './form-preview-controller.component';

describe('FormPreviewControllerComponent', () => {
  let component: FormPreviewControllerComponent;
  let fixture: ComponentFixture<FormPreviewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPreviewControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPreviewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
