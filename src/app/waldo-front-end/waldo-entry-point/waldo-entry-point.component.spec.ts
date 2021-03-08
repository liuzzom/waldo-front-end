import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaldoEntryPointComponent } from './waldo-entry-point.component';

describe('WaldoEntryPointComponent', () => {
  let component: WaldoEntryPointComponent;
  let fixture: ComponentFixture<WaldoEntryPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaldoEntryPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaldoEntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
