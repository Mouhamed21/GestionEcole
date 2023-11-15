import { TestBed } from '@angular/core/testing';

import { CentreReferenceService } from './centre-reference.service';

describe('CentreReferenceService', () => {
  let service: CentreReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
