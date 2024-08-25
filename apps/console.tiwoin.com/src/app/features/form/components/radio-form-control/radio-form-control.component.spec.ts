import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFormControlComponent } from './radio-form-control.component';

describe('RadioFormControlComponent', () => {
  let component: RadioFormControlComponent;
  let fixture: ComponentFixture<RadioFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
