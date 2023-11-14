import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauQualificationCibleComponentComponent } from './niveau-qualification-cible.component';

describe('NiveauQualificationCibleComponentComponent', () => {
  let component: NiveauQualificationCibleComponentComponent;
  let fixture: ComponentFixture<NiveauQualificationCibleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauQualificationCibleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauQualificationCibleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
