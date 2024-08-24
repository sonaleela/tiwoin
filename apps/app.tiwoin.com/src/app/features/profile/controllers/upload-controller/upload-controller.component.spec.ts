import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadControllerComponent } from './upload-controller.component';

describe('UploadControllerComponent', () => {
  let component: UploadControllerComponent;
  let fixture: ComponentFixture<UploadControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
