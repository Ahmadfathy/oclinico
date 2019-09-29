import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

interface ViewRequestProduct {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewRequestProductServices {
  constructor(private http: HttpClient) { }

  getData(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Store/get-store-request-details/${value}`, {})
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
}

