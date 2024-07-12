import { TestBed } from '@angular/core/testing';

import { ValidarGuard } from './validar.guard';

describe('ValidarGuard', () => {
  let guard: ValidarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
