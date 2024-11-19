import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { map, Observable } from 'rxjs';

export interface AppointmentTime {
  start: string;
  end: string;
}

export interface Appointment {
  appointment_id: number;
  user_id?: number;

  start: string;
  end: string;

}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private httpClient: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.httpClient.get("/api/appointments").pipe(
      map(resp => <Appointment[]>resp)
    )
  }

  updateAppointment(newContent: Appointment, paymentToken: string): Observable<HttpResponse<Object>> {
    return this.httpClient.put("/api/appointments/"+newContent.appointment_id, newContent, {observe: "response", params: {token: paymentToken}})
  }
}
