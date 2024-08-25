import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLeaveComponent } from './time-leave.component';

describe('TimeLeaveComponent', () => {
  let component: TimeLeaveComponent;
  let fixture: ComponentFixture<TimeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
