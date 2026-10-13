import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { LegacyService } from 'src/app/services/legacy.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  status: "unpaid" | "charged" | "confirmed" = "unpaid";

  constructor(private userService: UserService, private bookingService: BookingService, private legacyService: LegacyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      let paymentToken = param.get("payment_token");

      if (paymentToken && this.bookingService.service && this.userService.authenticatedUser) {
        this.legacyService.createTransaction({
          amount: this.bookingService.service.Price,
          payment_token: paymentToken,
          customer_ref: this.userService.authenticatedUser.email,
          payment_ref: this.bookingService.service.Name
        }).subscribe(response => {
          if (response.status == 200) {
            this.status = "charged";

            if (response.body?.payment_id) {
              this.bookingService.placeBooking(response.body.payment_id)?.subscribe(response => {
                if (response.status == 200) {
                  this.status = "confirmed";
                }
              });
            }
          }
        })
      }
    })
    
  }

}
