import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { DayPilotCalendarComponent } from '@daypilot/daypilot-lite-angular';
import { Appointment } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-selection',
  templateUrl: './appointment-selection.component.html',
  styleUrls: ['./appointment-selection.component.scss']
})
export class AppointmentSelectionComponent implements OnInit {

  constructor(public bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    
  }

  continueClick() {
    this.router.navigate(["/book/pay"]);
  }

}
