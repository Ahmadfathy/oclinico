import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface ViewSellinvoice {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewSellinvoiceServices {
  constructor(private http: HttpClient) { }

  getProduct(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-product/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveOrder(data, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/sales-invoice/add-new-sales-invoice/`, data, {})
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

  getPT(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-store-manufacturer`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getInvData(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/prescription/get-prescription-by-appointment-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

}

