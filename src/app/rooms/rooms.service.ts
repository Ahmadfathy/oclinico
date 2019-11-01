import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Rooms {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomsServices {
  constructor(private http: HttpClient) { }

  getAllRoomType(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/room-type/get-all-room-type/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getAllFloor(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/floor/get-all-floor/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getAllRooms(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Room/get-all-room/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getRoomById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Room/get-room-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewRoom(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Room/add-new-room/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateRoom(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/Room/update-room/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //
}

