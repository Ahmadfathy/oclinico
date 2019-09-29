import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

interface RequestProductList {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestProductListServices {
  constructor(private http: HttpClient) { }

  getRequest(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Store/get-store-request-details/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getData(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Store/get-store-request/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }
}

