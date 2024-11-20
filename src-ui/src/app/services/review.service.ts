import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { User } from './user.service';

export interface Review {
  review_id: number;
  user_id: number,
  user_name?: string,

  rating: number,
  title: string,
  content: string,
  date: string,
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  private _reviews?: Review[];

  public get reviews() {
    if(!this._reviews) {
      this._reviews = [] // Important to prevent flooding the server with requests
      this.http.get("/api/reviews", {params: {filter_reviews: true}}).pipe(
        map(item => <Review[]>item),
        tap(reviews => {
          this._reviews = reviews
        }),
        catchError(err => {
          setTimeout(() => {this._reviews = undefined}, 3000);
          throw err;
        })
      ).subscribe()

    }
    return this._reviews
  }

  public calculateAverage() {

    if (this.reviews.length == 0) {
      return 0
    }
    
    let total = 0;
    this.reviews.forEach(review => {
      total += review.rating;
    })

    return total / this.reviews.length
  
  }
}
