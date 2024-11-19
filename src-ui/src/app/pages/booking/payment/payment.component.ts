import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(public bookingService: BookingService) { }

  ngOnInit(): void {
    
  }

  payByCardClick() {
    window.open(`http://localhost:3000?returnUrl=http://localhost:4200/book/paymentCallback&merchantName=Dr%20Plump%20LTD.%20Edinburgh&paymentAmount=${this.bookingService.getTotalPayable()}`, "Payment Processor", "width=600,height=800")
  }

}
