import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionAcademieComponent } from './inspection-academie.component';

describe('InspectionAcademieComponent', () => {
  let component: InspectionAcademieComponent;
  let fixture: ComponentFixture<InspectionAcademieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionAcademieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionAcademieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
