import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { Service } from 'src/app/services/our-services.service';

@Component({
  selector: 'app-service-choice',
  templateUrl: './service-choice.component.html',
  styleUrls: ['./service-choice.component.scss']
})
export class ServiceChoiceComponent implements OnInit {

  constructor(private bookingService: BookingService, private router: Router) { }

  selectedService?: Service;

  ngOnInit(): void {
  }

  updateSummary(selectedService: Service) {
    this.selectedService = selectedService;
    this.bookingService.selectService(selectedService);
  }

  continueClick() {
    if (this.bookingService.chosenService) {
      this.router.navigate(["/book/appointment-selection"]);
    }
    
  }

}
