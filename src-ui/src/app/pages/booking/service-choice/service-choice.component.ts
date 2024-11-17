import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Service } from 'src/app/services/our-services.service';

@Component({
  selector: 'app-service-choice',
  templateUrl: './service-choice.component.html',
  styleUrls: ['./service-choice.component.scss']
})
export class ServiceChoiceComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  selectedService?: Service;

  ngOnInit(): void {
  }

  updateSummary(selectedService: Service) {
    this.selectedService = selectedService;
    this.bookingService.selectService(selectedService);
  }

}
