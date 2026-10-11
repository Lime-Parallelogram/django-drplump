import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface LegacyTransaction {
  Reference: string,
  CustomerReference: string,
  AmountPayable: string,
  CardRedeemed: string,
  CardRedeemedAmount: number,
}

export interface PayInterface {
  amount: number,
  payment_token: string,
  gift_card?: string,
  customer_ref: string,
  payment_ref: string
}

export interface PayResponse {
  payment_id: string,
}

@Injectable({
  providedIn: 'root'
})
export class LegacyService {

  constructor(private http: HttpClient) { }

  getTransactions(userID: string): Observable<LegacyTransaction[]> {
    return this.http.post("/legacy/payments/transactions.php", {customer_ref: userID}).pipe(
      map(response => <LegacyTransaction[]>response)
    )
  }

  createTransaction(content: PayInterface): Observable<HttpResponse<PayResponse>> {
    return this.http.post("/legacy/payments/pay.php", content, { observe: "response" }).pipe(
      map(response => <HttpResponse<PayResponse>>response)
    )
  }
}
