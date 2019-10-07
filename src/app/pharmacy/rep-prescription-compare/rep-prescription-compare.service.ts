import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface RepPrescriptionCompareName {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class RepPrescriptionCompareServices {
  constructor(private http: HttpClient) { }

  getGeneric(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/rep/rep-inventory/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }
}

