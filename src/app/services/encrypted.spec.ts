import { TestBed } from '@angular/core/testing';

import { Encrypted } from './encrypted';

describe('Encrypted', () => {
  let service: Encrypted;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Encrypted);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
