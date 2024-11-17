import { Injectable } from '@angular/core';
import { Service } from './our-services.service';

export interface BookingRequest {
  service: Service;
  giftCardCode?: string;
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public activeBooking?: BookingRequest;

  constructor() { }

  public selectService(service: Service) {
    this.activeBooking = {
      service: service
    };
  }
}
