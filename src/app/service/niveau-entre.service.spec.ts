import { TestBed } from '@angular/core/testing';

import { NiveauEntreService } from './niveau-entre.service';

describe('NiveauEntreService', () => {
  let service: NiveauEntreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveauEntreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
