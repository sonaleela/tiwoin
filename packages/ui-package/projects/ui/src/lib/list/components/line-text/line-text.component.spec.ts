import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTextComponent } from './line-text.component';

describe('LineTextComponent', () => {
  let component: LineTextComponent;
  let fixture: ComponentFixture<LineTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
