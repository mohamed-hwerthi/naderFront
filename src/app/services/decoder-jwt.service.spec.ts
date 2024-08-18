import { TestBed } from '@angular/core/testing';

import { DecoderJwtService } from './decoder-jwt.service';

describe('DecoderJwtService', () => {
  let service: DecoderJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoderJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
