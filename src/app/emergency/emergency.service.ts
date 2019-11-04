import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Emergency {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmergencyServices {
  constructor(private http: HttpClient) { }

  getAllEmergency(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/get-all-dep-emergency/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }


  getEmergencyById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/get-dep-emergency-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewEmergency(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/add-new-dep-emergency/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateEmergency(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/update-dep-emergency/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateEmergencyCheckOut(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/get-dep-emergency-check-out/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  updateClinic(value1, value2, callback){
    debugger;
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/get-dep-emergency-update-clinic/${value1}/${value2}`, {})
    .subscribe((res) => {
      callback(res);
    });
  }

  // ********************************************************************** //
  // ********************************************************************** //

  getPatientData(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/get-all-patient-by-num-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getAllRoom(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Room/get-all-room/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getAllClinic(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/dep-emergency/get-all-clinic/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }
}

