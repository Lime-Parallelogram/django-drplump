import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-panel',
  templateUrl: './review-panel.component.html',
  styleUrls: ['./review-panel.component.scss']
})
export class ReviewPanelComponent implements OnInit {

  constructor(public reviewService: ReviewService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {}

}
