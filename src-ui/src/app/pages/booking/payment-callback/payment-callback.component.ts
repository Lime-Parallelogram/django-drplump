import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-payment-callback',
  template: '',
  styleUrls: []
})
export class PaymentCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit(): void {
    if (window.opener) {
      
      this.route.queryParamMap.subscribe(param => {
        if (param.get("token")) {
          window.opener.location.href = "/book/confirm?payment_token="+param.get("token")
        }
      })
      
      window.close()
    }
  }

}
