import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelFormComponent } from './add-model-form.component';

describe('AddModelFormComponent', () => {
  let component: AddModelFormComponent;
  let fixture: ComponentFixture<AddModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
