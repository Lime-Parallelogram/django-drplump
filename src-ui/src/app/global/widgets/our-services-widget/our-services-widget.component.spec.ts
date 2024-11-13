import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurServicesWidgetComponent } from './our-services-widget.component';

describe('OurServicesWidgetComponent', () => {
  let component: OurServicesWidgetComponent;
  let fixture: ComponentFixture<OurServicesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurServicesWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurServicesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
