import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseFormatriceComponent } from './entreprise-formatrice.component';

describe('EntrepriseFormatriceComponent', () => {
  let component: EntrepriseFormatriceComponent;
  let fixture: ComponentFixture<EntrepriseFormatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseFormatriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseFormatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
