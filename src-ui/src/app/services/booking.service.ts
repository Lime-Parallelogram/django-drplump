import { Injectable } from '@angular/core';
import { Service } from './our-services.service';
import { Appointment, AppointmentsService } from './appointments.service';
import { from, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './user.service';

export interface PaymentBreakdown {
  serviceTotal: number;
  reductions: number;
  booking_fee: number;
}

const GIFT_CARD_SERVICE = -1;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public chosenService: Service = {
    ID: -99,
    Name: "FILLERS",
    Price: 76,
    Description: "TEST",
    ImageURL: ""
  };
  public myAppointment?: Appointment;
  public noAppointment: boolean = false;

  constructor(private appointmentService: AppointmentsService, private userService: UserService) { }

  public selectService(service: Service) {
    this.chosenService = service;
    if (service.ID == GIFT_CARD_SERVICE) {
      this.noAppointment = true;
    }
    localStorage.setItem("service", JSON.stringify(service))
  }

  public set appointment(appointment: Appointment | undefined) {
    if (this.chosenService?.ID == GIFT_CARD_SERVICE) {
      alert("No appointment needed for a gift card");
    } else {
      this.myAppointment = appointment;
      localStorage.setItem("appointment", JSON.stringify(appointment))
    }
    
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

  public get service(): Service {
    if (this.chosenService.ID == -99) {
      let from_storage = localStorage.getItem("service")
      if (from_storage) {
        this.chosenService = JSON.parse(from_storage);
      }
    }

    return this.chosenService
  }

  // ─── Payment Related ─────────────────────────────────────────────────

  public getPaymentBreakdown(): PaymentBreakdown {
    return {
      serviceTotal: this.chosenService?.Price,
      reductions: 0,
      booking_fee: 5.00
    }
  }

  public getTotalPayable(breakdown: PaymentBreakdown) {
    return breakdown.serviceTotal + breakdown.booking_fee + breakdown.reductions;
  }

  public placeBooking(payment_id: string): Observable<HttpResponse<Object>> | undefined {
    if (this.appointment && this.userService.authenticatedUser) {
      this.appointment.user_id = this.userService.authenticatedUser.user_id;
      this.appointment.payment_ref = payment_id;
      this.appointment.status = "CONFIRMED";
      this.appointment.service_id = this.chosenService.ID;
      return this.appointmentService.updateAppointment(this.appointment, payment_id);
    }

    // Special handling for buying Gift Cards
    if (this.chosenService?.ID == GIFT_CARD_SERVICE) {

    }

    return undefined;
  }
}
