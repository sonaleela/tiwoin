import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFormControlComponent } from './time-form-control.component';

describe('TimeFormControlComponent', () => {
  let component: TimeFormControlComponent;
  let fixture: ComponentFixture<TimeFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
