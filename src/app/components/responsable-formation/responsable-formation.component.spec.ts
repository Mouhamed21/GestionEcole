import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableFormationComponent } from './responsable-formation.component';

describe('ResponsableFormationComponent', () => {
  let component: ResponsableFormationComponent;
  let fixture: ComponentFixture<ResponsableFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
