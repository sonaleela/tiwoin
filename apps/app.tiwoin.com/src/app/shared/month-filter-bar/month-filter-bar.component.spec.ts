import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFilterBarComponent } from './month-filter-bar.component';

describe('MonthFilterBarComponent', () => {
  let component: MonthFilterBarComponent;
  let fixture: ComponentFixture<MonthFilterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MonthFilterBarComponent]
    });
    fixture = TestBed.createComponent(MonthFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
