import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DayPilot, DayPilotCalendarComponent } from "@daypilot/daypilot-lite-angular";
import { map, Observable } from 'rxjs';
import { Appointment, AppointmentTime, AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-bookings-calendar-widget',
  templateUrl: './bookings-calendar-widget.html',
  styleUrls: ['./bookings-calendar-widget.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookingsCalendarWidgetComponent implements OnInit {

  constructor(private appointmentsService: AppointmentsService) { }

  @Output() appointmentSelected: EventEmitter<Appointment> = new EventEmitter<Appointment>();

  selectedEvent?: DayPilot.Event;

  config: DayPilot.CalendarConfig = {
    viewType: "Week",
    headerDateFormat: "dd/MM/yyyy",
    timeRangeSelectedHandling: 'Disabled',
    eventDeleteHandling: 'Disabled',
    eventMoveHandling: 'Disabled',
    eventResizeHandling: 'Disabled',
    eventRightClickHandling: 'Disabled',
    onEventClick: async args => {
      this.appointmentSelected.emit(args.e.data.backingAppointment); // All events should have associated backingAppointment

      // Reverse colour of previously chosen appointment
      if (this.selectedEvent) {
        this.selectedEvent.data.backColor = "#fff4e6"
        this.selectedEvent.data.text = "Available";
      }
      this.selectedEvent = args.e;

      // Set colour of new appointment
      args.e.data.backColor = "#c3f761"
      args.e.data.text = "Selected";
      
    }


  }

  events: DayPilot.EventData[] = [];

  navigatorConfig: DayPilot.NavigatorConfig = {
    showMonths: 2,
    skipMonths: 1,
    selectMode: "Week",
    cellWidth: 30,
    cellHeight: 30,
    dayHeaderHeight: 30,
    titleHeight: 30
  };

  get date(): DayPilot.Date {
    return this.config.startDate as DayPilot.Date;
  }

  set date(value: DayPilot.Date) {
    this.config.startDate = value;
  }

  ngOnInit(): void {
    this.getCalendarFormatAvailability().subscribe(
      events => { this.events = events }
    );
  }

  /**
   * Helper method to take server-stored appointments and output any available appointments
   * @returns An observable of DayPilot Format Events
   */
  getCalendarFormatAvailability(): Observable<DayPilot.EventData[]> {
    return this.appointmentsService.getAppointments().pipe(
      map(appointments =>
        // Don't want to show appointments that a user has already booked
        appointments.filter(appointment => {
          if (appointment.user_id) {
            return false;
          }
          return true;
        })

        .map(appointment => {
        return {
          id: appointment.appointment_id,
          start: appointment.start,
          end: appointment.end,
          text: "Available",
          barColor: "#ff80b2",
          backColor: "#fff4e6",
          backingAppointment: appointment
      } }))
    )
  } 

}
