import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTableComponent } from './treatment-table.component';

describe('DataTableComponent', () => {
  let component: TreatmentTableComponent;
  let fixture: ComponentFixture<TreatmentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
