import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { map, Observable } from 'rxjs';

export interface AppointmentTime {
  start: string;
  end: string;
}

export interface Appointment {
  status: "CONFIRMED" | "RESERVABLE" | "AVAILABLE";
  appointment_id: number;
  user_id?: number;
  service_id: number;

  start: string;
  end: string;

  
}

/**
 * Derived attributes are sent from the server but not submitted back
 */
export interface AppointmentEnhanced extends Appointment {
  is_reviewed: boolean
  service_name: string
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private httpClient: HttpClient) { }

  getAppointments(): Observable<AppointmentEnhanced[]> {
    return this.httpClient.get("/api/appointments").pipe(
      map(resp => <AppointmentEnhanced[]>resp)
    )
  }

  updateAppointment(newContent: Appointment, paymentToken: string): Observable<HttpResponse<Object>> {
    return this.httpClient.put("/api/appointments/"+newContent.appointment_id, newContent, {observe: "response", params: {token: paymentToken}})
  }
}
