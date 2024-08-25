import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataPageComponent } from './form-data-page.component';

describe('FormDataPageComponent', () => {
  let component: FormDataPageComponent;
  let fixture: ComponentFixture<FormDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDataPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
