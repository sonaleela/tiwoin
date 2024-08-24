import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineCaptionComponent } from './line-caption.component';

describe('LineCaptionComponent', () => {
  let component: LineCaptionComponent;
  let fixture: ComponentFixture<LineCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineCaptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
