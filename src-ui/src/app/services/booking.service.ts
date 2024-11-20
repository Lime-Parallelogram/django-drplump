import { Injectable } from '@angular/core';
import { Service } from './our-services.service';
import { Appointment, AppointmentsService } from './appointments.service';
import { from, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public chosenService?: Service = {
    ID: 1,
    Name: "FILLERS",
    Price: 190,
    Description: "TEST",
    ImageURL: ""
  };
  public myAppointment?: Appointment;

  constructor(private appointmentService: AppointmentsService, private userService: UserService) { }

  public selectService(service: Service) {
    this.chosenService = service;
  }

  public set appointment(appointment: Appointment | undefined) {
    this.myAppointment = appointment;
    localStorage.setItem("appointment", JSON.stringify(appointment))
  }

  public get appointment(): Appointment | undefined {
    if (!this.myAppointment) {
      let from_storage = localStorage.getItem("appointment")
      if (from_storage) {
        this.myAppointment = JSON.parse(from_storage);
      }
    }

    return this.myAppointment
  }

  // ─── Payment Related ─────────────────────────────────────────────────

  public getTotalPayable(): number {
    return this.chosenService?.Price
  }

  public placeBooking(paymentToken: string): Observable<HttpResponse<Object>> | undefined {
    if (this.appointment && this.userService.authenticatedUser) {
      this.appointment.user_id = this.userService.authenticatedUser.user_id;
      return this.appointmentService.updateAppointment(this.appointment, paymentToken);
    }

    return undefined;
  }
}
