import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserRatesRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getRates(): Observable<any> {
    return this.http.get(`${environment.api}/vendorrates`);
  }


  editSupport(id): Observable<any> {
    return this.http.get(`${environment.api}/vendorrates/` + id);
  }

  updateSupport(form,id): Observable<any> {
    return this.http.put(`${environment.api}/vendorrates/` + id, form.value);
  }

  storeSupport(form): Observable<any> {
    return this.http.post(`${environment.api}/vendorrates`,form.value);
  }

  deleteSupport(id): Observable<any> {
    return this.http.delete(`${environment.api}/vendorrates/` + id);
  }
  getAllEmployees(): Observable<any> {
    return this.http.get(`${environment.api}/all-employee-list`);
  }
}
