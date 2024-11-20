import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.scss']
})
export class ReviewPanelComponent implements OnInit {

  constructor(public reviewService: ReviewService) { }

  ngOnInit(): void {}

}
