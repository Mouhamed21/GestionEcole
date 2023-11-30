import { TestBed } from '@angular/core/testing';

import { ResponsableFormationService } from './responsable-formation.service';

describe('ResponsableFormationService', () => {
  let service: ResponsableFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
