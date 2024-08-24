import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentControllerComponent } from './document-controller.component';

describe('DocumentControllerComponent', () => {
  let component: DocumentControllerComponent;
  let fixture: ComponentFixture<DocumentControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
