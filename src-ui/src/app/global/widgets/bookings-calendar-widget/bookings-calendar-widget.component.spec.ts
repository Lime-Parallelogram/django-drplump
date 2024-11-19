import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCalendarWidgetComponent } from './bookings-calendar-widget.component';

describe('BookingsCalendarWidgetComponent', () => {
  let component: BookingsCalendarWidgetComponent;
  let fixture: ComponentFixture<BookingsCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsCalendarWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
