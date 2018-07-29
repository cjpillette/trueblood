
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OignonComponent } from './oignon.component';

describe('OignonComponent', () => {
  let component: OignonComponent;
  let fixture: ComponentFixture<OignonComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OignonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OignonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
