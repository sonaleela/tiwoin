import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataViewComponent } from './form-data-view.component';

describe('FormDataViewComponent', () => {
  let component: FormDataViewComponent;
  let fixture: ComponentFixture<FormDataViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDataViewComponent]
    });
    fixture = TestBed.createComponent(FormDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
