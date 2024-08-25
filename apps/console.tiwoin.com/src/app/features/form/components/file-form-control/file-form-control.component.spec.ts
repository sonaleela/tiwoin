import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormControlComponent } from './file-form-control.component';

describe('FileFormControlComponent', () => {
  let component: FileFormControlComponent;
  let fixture: ComponentFixture<FileFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
