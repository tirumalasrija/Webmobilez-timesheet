import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyInvoiceRestService {
  users: Array<{ id: number, name: string, email: string }> = [];
  constructor(private http: HttpClient) { }
  loadUser(): Observable<object> {
    return this.http.get(`${environment.api}/user-list/create`);
  }

  getCountInvoices(): Observable<any> {
    return this.http.get(`${environment.api}/get-count-company-invoice-list`);
  }
  getInvoices(): Observable<any> {
    return this.http.get(`${environment.api}/admin-company-invoices`);
  }
  storeCompanyInvoices(form): Observable<any> {
    return this.http.post(`${environment.api}/admin-company-invoices`, form.value);
  }
  getpayments(): Observable<any> {
    return this.http.get(`${environment.api}/payment-list`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-list`);
  }
  getAllEmployees(): Observable<any> {
    return this.http.get(`${environment.api}/all-employee-list`);
  }

  getCurentUser(): Observable<any> {
    return this.http.get(`${environment.api}/get-user-data`);
  }
  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/user-list/` + id);
  }
  /*editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/invoice-list/` + id);
  } */

  updateUser(form, id): Observable<any> {
    return this.http.put(`${environment.api}/invoice-list/` + id, form.value);
  }
  storePayment(form): Observable<any> {
    return this.http.post(`${environment.api}/payment-list`, form.value);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/user-list`, form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.api}/user-list/` + id);
  }
}
