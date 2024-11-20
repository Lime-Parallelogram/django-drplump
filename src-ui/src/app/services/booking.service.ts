import { Injectable } from '@angular/core';
import { Service } from './our-services.service';
import { Appointment, AppointmentsService } from './appointments.service';
import { from, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './user.service';

export interface PaymentBreakdown {
  serviceTotal: number;
  taxes: number;
  reductions: number;
  booking_fee: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public chosenService?: Service = {
    ID: 1,
    Name: "FILLERS",
    Price: 76,
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

  public getPaymentBreakdown(): PaymentBreakdown {
    return {
      serviceTotal: this.chosenService?.Price,
      taxes: Math.fround(this.chosenService?.Price * 20) / 100,
      reductions: 0,
      booking_fee: 5.00
    }
  }

  public getTotalPayable(breakdown: PaymentBreakdown) {
    return Math.fround((breakdown.serviceTotal + breakdown.booking_fee + breakdown.reductions + breakdown.taxes) * 100) /100;
  }

  public placeBooking(paymentToken: string): Observable<HttpResponse<Object>> | undefined {
    if (this.appointment && this.userService.authenticatedUser) {
      this.appointment.user_id = this.userService.authenticatedUser.user_id;
      return this.appointmentService.updateAppointment(this.appointment, paymentToken);
    }

    return undefined;
  }
}
