import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Floors {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class FloorsServices {
  constructor(private http: HttpClient) { }

  getAllFloor(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/floor/get-all-floor/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }


  getFloorById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/floor/get-floor-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewFloor(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/floor/add-new-floor/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateFloor(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/floor/update-floor/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //
}

