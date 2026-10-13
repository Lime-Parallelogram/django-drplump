import { Component, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { Appointment, AppointmentEnhanced, AppointmentsService } from 'src/app/services/appointments.service';
import { LegacyService, LegacyTransaction } from 'src/app/services/legacy.service';
import { Review, ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

interface AppointmentExtended extends AppointmentEnhanced {
  amount: number | undefined;
}

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  constructor (private legacyService: LegacyService, private userService: UserService, public appointmentsService: AppointmentsService, private reviewService: ReviewService, private modalService: NgbModal) { }

  myAppointments: AppointmentExtended[] | undefined;

  // Form components for review
  defaultReview: Review = {
    appointment_id: -1,
    rating: 3,
    title: "",
    content: "",
    date: (new Date()).toISOString().substring(0,10)
  }

  newReview: Review = structuredClone(this.defaultReview);


  ngOnInit() {
    this.appointmentsService.getAppointments().pipe(
      map(resp => resp.filter(item => item.user_id == this.userService.authenticatedUser?.user_id))
    ).subscribe(result => {
      if (this.userService.authenticatedUser?.email) {
        this.legacyService.getTransactions(this.userService.authenticatedUser?.email).subscribe(
          response2 => {
            this.myAppointments = result.map(item => {
            return {
              ...item,
              amount: response2.body?.results.find(value => value.PaymentUUID == item.payment_ref)?.AmountPayable
            }});
          }
        )
      }
      
      
    })
  }

  downloadReceipt(payment_id: string|undefined) {
    if (this.userService.authenticatedUser?.name && payment_id) {
      this.legacyService.getReceiptDownloadLink(this.userService.authenticatedUser?.name, payment_id).subscribe(
        response => {
          if (response.body?.result_url) {
            window.open(response.body.result_url, '_blank')?.focus();
          }
        }
      )
    }
    
  }

  open(content: TemplateRef<any>, appointmentID: number) {
    this.newReview.appointment_id = appointmentID;

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        this.reviewService.createReview(this.newReview).subscribe(
          response => {
            if (response.ok) {
              this.newReview = structuredClone(this.defaultReview);
              alert("Thank you for your review.")
            } else {
              alert("There was a problem submitting your review.")
            }
          }
        )
			},
			(reason) => {
				console.log(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

}
