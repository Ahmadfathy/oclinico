import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface RoomTypes {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomTypesServices {
  constructor(private http: HttpClient) { }

  getAllRoomTypes(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/room-type/get-all-room-type/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }


  getRoomTypeById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/room-type/get-room-type-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewRoomType(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/room-type/add-new-room-type/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateRoomType(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/room-type/update-room-type/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //
}

