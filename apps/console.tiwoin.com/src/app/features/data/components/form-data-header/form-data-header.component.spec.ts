import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataHeaderComponent } from './form-data-header.component';

describe('FormDataHeaderComponent', () => {
  let component: FormDataHeaderComponent;
  let fixture: ComponentFixture<FormDataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
