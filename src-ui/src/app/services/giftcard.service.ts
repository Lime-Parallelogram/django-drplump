import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface CodeValidationResponse {
  valid: boolean;
  value?: number;
  value_remaining?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiftcardService {

  constructor(private http: HttpClient) { }

  public getGiftCardValue(giftCardCode: string) {
    return this.http.post("/legacy/giftc/validate.php", {code: giftCardCode}).pipe(
      map(response => <CodeValidationResponse>response)
    )
  }
}
