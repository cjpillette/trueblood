import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComboComponent } from './data-combo.component';

describe('DataTablesListComponent', () => {
  let component: DataComboComponent;
  let fixture: ComponentFixture<DataComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
