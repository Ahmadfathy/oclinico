import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface PatientRooms {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientRoomsServices {
  constructor(private http: HttpClient) { }

  getAllPatientRooms(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/get-all-patient-room/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }


  getPatientRoomById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/get-patient-room-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewPatientRoom(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/add-new-patient-room/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updatePatientRoom(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/update-patient-room/`, value)
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

  getRoomBedById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/patient-room/get-bed-by-room-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }
}

