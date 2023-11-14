import { TestBed } from '@angular/core/testing';

import { NiveauQualificationCibleService } from './niveau-qualification-cible.service';

describe('NiveauQualificationCibleServiceService', () => {
  let service: NiveauQualificationCibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveauQualificationCibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
