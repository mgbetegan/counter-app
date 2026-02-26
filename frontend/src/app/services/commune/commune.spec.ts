import { TestBed } from '@angular/core/testing';

import { Commune } from './commune';

describe('Commune', () => {
  let service: Commune;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Commune);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
