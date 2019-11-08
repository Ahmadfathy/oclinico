import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface laborataryTest {
  ID: number;
  NameAr: string;
  NameEn: string;
}

@Injectable({
  providedIn: 'root'
})
export class laborataryTestServices {
  constructor(private http: HttpClient) { }

  getAllTests(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-all-test/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getTestById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-test-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewTest(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/add-new-test/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewTestCategory(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/add-new-test-category-junk/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  
  updateTest(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/update-test/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  // ********************************************************************** //
  // ********************************************************************** //
  // ********************************************************************** //
  // ********************************************************************** //

  getAllNormalTests(callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-all-test-normal/`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  getTestNormalById(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/get-test-normal-by-id/${value}`, {})
      .subscribe((res) => {
        callback(res);
      });
  }

  saveNewNormalTest(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/add-new-test-normal/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }

  updateNormalTest(value, callback) {
    return this.http.post(`https://api.oclinico.com/PharmacyAPI/api/labs/update-test-normal/`, value)
      .subscribe((res) => {
        callback(res);
      });
  }
}

