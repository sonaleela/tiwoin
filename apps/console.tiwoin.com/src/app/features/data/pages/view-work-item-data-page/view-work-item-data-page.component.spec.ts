import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkItemDataPageComponent } from './view-work-item-data-page.component';

describe('ViewWorkItemDataPageComponent', () => {
  let component: ViewWorkItemDataPageComponent;
  let fixture: ComponentFixture<ViewWorkItemDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWorkItemDataPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWorkItemDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
