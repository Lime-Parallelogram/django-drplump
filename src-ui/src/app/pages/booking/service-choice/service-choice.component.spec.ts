import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChoiceComponent } from './service-choice.component';

describe('ServiceChoiceComponent', () => {
  let component: ServiceChoiceComponent;
  let fixture: ComponentFixture<ServiceChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
