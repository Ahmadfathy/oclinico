import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

interface InventoryProduct {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryServices {
  constructor(private http: HttpClient) { }

  getProduct(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-product/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveOrder(data, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/inventory/add-new-inventory/`, data, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getMaster(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/buy-invoice/get-store-manufacturer/`, {})
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
}

