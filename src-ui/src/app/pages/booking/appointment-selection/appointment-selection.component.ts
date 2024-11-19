import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { DayPilotCalendarComponent } from '@daypilot/daypilot-lite-angular';
import { Appointment } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointment-selection',
  templateUrl: './appointment-selection.component.html',
  styleUrls: ['./appointment-selection.component.scss']
})
export class AppointmentSelectionComponent implements OnInit {

  constructor(public bookingService: BookingService) { }

  ngOnInit(): void {
    
  }

  continueClick() {

  }

}
