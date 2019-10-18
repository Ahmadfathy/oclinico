import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Labs {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class LaborataryServices {
  constructor(private http: HttpClient) { }

  getAllLabs(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-all-labs/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getLabById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewLab(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/add-new-lab/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateLab(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/update-lab/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //

  getAllCategory(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-all-test-category/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getCategoryById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-test-category-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewCategory(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/add-new-test-category/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateCategory(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/update-test-category/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //
}

