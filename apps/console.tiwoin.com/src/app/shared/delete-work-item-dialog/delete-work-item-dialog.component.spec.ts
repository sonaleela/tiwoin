import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkItemDialogComponent } from './delete-work-item-dialog.component';

describe('DeleteWorkItemDialogComponent', () => {
  let component: DeleteWorkItemDialogComponent;
  let fixture: ComponentFixture<DeleteWorkItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteWorkItemDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteWorkItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
