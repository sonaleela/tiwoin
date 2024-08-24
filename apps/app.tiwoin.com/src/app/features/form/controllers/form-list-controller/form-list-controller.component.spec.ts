import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListControllerComponent } from './form-list-controller.component';

describe('FormListControllerComponent', () => {
  let component: FormListControllerComponent;
  let fixture: ComponentFixture<FormListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
