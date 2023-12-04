import { TestBed } from '@angular/core/testing';

import { InspectionAcademieService } from './inspection-academie.service';

describe('InspectionAcademieService', () => {
  let service: InspectionAcademieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionAcademieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
