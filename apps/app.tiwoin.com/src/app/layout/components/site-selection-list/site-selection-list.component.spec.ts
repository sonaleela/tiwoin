import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSelectionListComponent } from './site-selection-list.component';

describe('SiteListComponent', () => {
  let component: SiteSelectionListComponent;
  let fixture: ComponentFixture<SiteSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteSelectionListComponent]
    });
    fixture = TestBed.createComponent(SiteSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
