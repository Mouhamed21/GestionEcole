import { TestBed } from '@angular/core/testing';

import { EntrepriseFormatriceService } from './entreprise-formatrice.service';

describe('EntrepriseFormatriceService', () => {
  let service: EntrepriseFormatriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseFormatriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
