import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Sellinvoice {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class SellinvoiceServices {
  constructor(private http: HttpClient) { }

  getProduct(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-product/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveOrder(data, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/add-new-buy-invoice`, data, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getMaster(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-store-manufacturer`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

}

