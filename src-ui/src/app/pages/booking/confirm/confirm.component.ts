import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  confirmed = false;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      let paymentToken = param.get("payment_token");

      if (paymentToken) {
        this.bookingService.placeBooking(paymentToken)?.subscribe(response => {
          if (response.status == 200) {
            this.confirmed = true;
          }
        }
          
        );
      }
    })
    
  }

}
