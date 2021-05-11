import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  razorPayOrder(paymentData: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post('http://localhost:8001/api/v1/razorPayOrder', paymentData, {headers: headers});
  }
}
