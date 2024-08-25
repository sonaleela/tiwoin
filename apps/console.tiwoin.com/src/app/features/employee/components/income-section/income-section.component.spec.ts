import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSectionComponent } from './income-section.component';

describe('IncomeSectionComponent', () => {
  let component: IncomeSectionComponent;
  let fixture: ComponentFixture<IncomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
