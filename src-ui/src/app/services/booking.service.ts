import { Injectable } from '@angular/core';
import { Service } from './our-services.service';
import { Appointment } from './appointments.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public chosenService?: Service;
  public myAppointment?: Appointment;

  constructor() { }

  public selectService(service: Service) {
    this.chosenService = service;
  }

  public selectAppointment(appointment: Appointment) {
    this.myAppointment = appointment;
  }
}
