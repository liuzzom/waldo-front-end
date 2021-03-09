import { TestBed } from '@angular/core/testing';

import { PointersService } from './pointers.service';

describe('PointersService', () => {
  let service: PointersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
