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

  getProductByBarCode(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-product-barcode/${value}`, {})
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

}

