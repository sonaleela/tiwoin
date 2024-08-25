import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimeEntryDialogComponent } from './delete-time-entry-dialog.component';

describe('DeleteTimeEntryDialogComponent', () => {
  let component: DeleteTimeEntryDialogComponent;
  let fixture: ComponentFixture<DeleteTimeEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTimeEntryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTimeEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
