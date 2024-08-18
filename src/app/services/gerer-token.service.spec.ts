import { TestBed } from '@angular/core/testing';

import { GererTokenService } from './gerer-token.service';

describe('GererTokenService', () => {
  let service: GererTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
