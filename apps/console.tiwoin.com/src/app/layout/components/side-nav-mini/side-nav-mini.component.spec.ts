import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavMiniComponent } from './side-nav-mini.component';

describe('SideNavMiniComponent', () => {
  let component: SideNavMiniComponent;
  let fixture: ComponentFixture<SideNavMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavMiniComponent]
    });
    fixture = TestBed.createComponent(SideNavMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
