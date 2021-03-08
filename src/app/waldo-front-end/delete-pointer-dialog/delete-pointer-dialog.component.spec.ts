import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePointerDialogComponent } from './delete-pointer-dialog.component';

describe('DeletePointerDialogComponent', () => {
  let component: DeletePointerDialogComponent;
  let fixture: ComponentFixture<DeletePointerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePointerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePointerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
