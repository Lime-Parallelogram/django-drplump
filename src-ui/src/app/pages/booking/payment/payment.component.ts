import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { BookingService, PaymentBreakdown } from 'src/app/services/booking.service';
import { GiftcardService } from 'src/app/services/giftcard.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(public bookingService: BookingService, public giftCardService: GiftcardService) {
    this.currentCost = bookingService.getPaymentBreakdown();
  }

  giftCardProblemText = "";
  giftCardCode?: string;

  currentCost: PaymentBreakdown;

  ngOnInit(): void {
    
  }

  giftCardRedeem() {
    if (this.giftCardCode) {
      this.giftCardService.getGiftCardValue(this.giftCardCode).subscribe(
        response => {
          if (response.valid && response.value_remaining) {
            this.currentCost.reductions = - Math.min(response.value_remaining, this.currentCost.serviceTotal)
          } else {
            this.giftCardProblemText = "This card is not valid.";
          }
        }
      )
    }
  }
  payByCardClick() {
    window.open(`http://securepay.ru?returnUrl=http://localhost:4200/book/paymentCallback&merchantName=Dr%20Plump%20LTD.%20Edinburgh&paymentAmount=${this.bookingService.getTotalPayable(this.currentCost)}`, "Payment Processor", "width=600,height=800")
  }

}
