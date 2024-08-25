import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeFormControlComponent } from './datetime-form-control.component';

describe('DatetimeFormControlComponent', () => {
  let component: DatetimeFormControlComponent;
  let fixture: ComponentFixture<DatetimeFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatetimeFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatetimeFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
