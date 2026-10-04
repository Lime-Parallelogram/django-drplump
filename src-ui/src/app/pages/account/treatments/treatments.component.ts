import { Component, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment, AppointmentEnhanced, AppointmentsService } from 'src/app/services/appointments.service';
import { Review, ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  constructor (public appointmentsService: AppointmentsService, private reviewService: ReviewService, private modalService: NgbModal) { }

  myAppointments: AppointmentEnhanced[] | undefined;

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
    this.appointmentsService.getAppointments().subscribe(result => this.myAppointments = result)
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
