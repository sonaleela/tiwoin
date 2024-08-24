import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterBarComponent } from './date-filter-bar.component';

describe('DateFilterBarComponent', () => {
  let component: DateFilterBarComponent;
  let fixture: ComponentFixture<DateFilterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateFilterBarComponent]
    });
    fixture = TestBed.createComponent(DateFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
