import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSelectionSectionComponent } from './control-selection-section.component';

describe('ControlSelectionSectionComponent', () => {
  let component: ControlSelectionSectionComponent;
  let fixture: ComponentFixture<ControlSelectionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSelectionSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlSelectionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
