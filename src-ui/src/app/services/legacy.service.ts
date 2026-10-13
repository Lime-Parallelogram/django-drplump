import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';

export interface LegacyTransaction {
  results: {
    PaymentUUID: string,
    Reference: string,
    CustomerReference: string,
    AmountPayable: number,
    CardRedeemed: string,
    CardRedeemedAmount: number,
  }[]
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

export interface ReceiptResponse {
  success: boolean,
  result_url: string
}

@Injectable({
  providedIn: 'root'
})
export class LegacyService {

  constructor(private userService: UserService, private http: HttpClient) { }

  getTransactions(userID: string): Observable<HttpResponse<LegacyTransaction>> {
    return this.http.post("/legacy/payments/transactions.php", {customer_ref: userID}, { observe: "response" }).pipe(
      map(response => <HttpResponse<LegacyTransaction>>response)
    )
  }

  createTransaction(content: PayInterface): Observable<HttpResponse<PayResponse>> {
    return this.http.post("/legacy/payments/pay.php", content, { observe: "response" }).pipe(
      map(response => <HttpResponse<PayResponse>>response)
    )
  }

  getReceiptDownloadLink(name: string, payment_id: string) {
    return this.http.post("/legacy/payments/transaction_receipt.php", { name: name, payment_id: payment_id }, { observe: "response" }).pipe(
      map(response => <HttpResponse<ReceiptResponse>>response)
    )
  }
}
