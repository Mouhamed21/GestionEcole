import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreReferenceComponent } from './centre-reference.component';

describe('CentreReferenceComponent', () => {
  let component: CentreReferenceComponent;
  let fixture: ComponentFixture<CentreReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
