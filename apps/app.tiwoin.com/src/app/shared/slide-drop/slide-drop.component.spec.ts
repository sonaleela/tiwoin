import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDropComponent } from './slide-drop.component';

describe('SlideDropComponent', () => {
  let component: SlideDropComponent;
  let fixture: ComponentFixture<SlideDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
