import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface CodeValidationResponse {
  found: boolean;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiftcardService {

  constructor(private http: HttpClient) { }

  public getGiftCardValue(giftCardCode: string) {
    return this.http.post("/api/giftcard/getValue", {code: giftCardCode}).pipe(
      map(response => <CodeValidationResponse>response)
    )
  }
}
