import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSettingsComponent } from './date-time-settings.component';

describe('DateTimeSettingsComponent', () => {
  let component: DateTimeSettingsComponent;
  let fixture: ComponentFixture<DateTimeSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeSettingsComponent]
    });
    fixture = TestBed.createComponent(DateTimeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
