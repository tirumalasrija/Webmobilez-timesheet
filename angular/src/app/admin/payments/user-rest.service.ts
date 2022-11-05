import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

getpayments(): Observable<any> {
  return this.http.get(`${environment.api}/payment-list`);
}
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-list`);
  }

  editPayment(id): Observable<any> {
    return this.http.get(`${environment.api}/payment-list/` + id);
  }
  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/user-list/` + id);
  }

  updatePayment(form,id): Observable<any> {
    return this.http.put(`${environment.api}/payment-list/` + id, form.value);
  }
  storePayment(form): Observable<any> {
    return this.http.post(`${environment.api}/payment-list`,form.value);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/user-list`,form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.api}/user-list/` + id);
  }
}
