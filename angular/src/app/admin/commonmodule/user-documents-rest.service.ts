import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserDocumentsRestService {
  users: Array<{ id: number, name: string, email: string }> = [];
  constructor(private http: HttpClient) { }
  storeDocument(document): Observable<any> {

    return this.http.post(`${environment.api}/saveUserDocument`, document);
  }

  viewDocument(id): Observable<any> {
    return this.http.get(`${environment.api}/user-documents-list/` + id);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-list`);
  }
  getDocumentsUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-documents-list`);
  }


  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/user-list/` + id);
  }

  updatePayment(form, id): Observable<any> {
    return this.http.put(`${environment.api}/payment-list/` + id, form.value);
  }

  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/api/user-list`, form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.api}/user-documents-list/` + id);
  }
}
