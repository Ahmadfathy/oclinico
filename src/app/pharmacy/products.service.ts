import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface GenericName {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  constructor(private http: HttpClient) { }

  getGeneric(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/product-master/get-generic-name/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }
}

