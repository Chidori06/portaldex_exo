import { TestBed } from '@angular/core/testing';

import { Planetes } from './planetes';

describe('Planetes', () => {
  let service: Planetes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Planetes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
