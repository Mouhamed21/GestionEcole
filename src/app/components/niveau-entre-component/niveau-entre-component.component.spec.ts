import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauEntreComponentComponent } from './niveau-entre-component.component';

describe('NiveauEntreComponentComponent', () => {
  let component: NiveauEntreComponentComponent;
  let fixture: ComponentFixture<NiveauEntreComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauEntreComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauEntreComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
