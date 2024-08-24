import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBottomNavComponent } from './layout-bottom-nav.component';

describe('LayoutBottomNavComponent', () => {
  let component: LayoutBottomNavComponent;
  let fixture: ComponentFixture<LayoutBottomNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBottomNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
