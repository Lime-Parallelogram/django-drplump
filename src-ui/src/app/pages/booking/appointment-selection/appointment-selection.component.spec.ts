import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSelectionComponent } from './appointment-selection.component';

describe('AppointmentSelectionComponent', () => {
  let component: AppointmentSelectionComponent;
  let fixture: ComponentFixture<AppointmentSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
