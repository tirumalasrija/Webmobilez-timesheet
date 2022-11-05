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

  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-list`);
  }

  getPlacedUsers(): Observable<any> {
    return this.http.get(`${environment.api}/edit-consultant-User`);
  }
  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/user-list/` + id);
  }
  editConsultantUser(id): Observable<any> {
    return this.http.get(`${environment.api}/edit-consultant-User/` + id);
  }
  updateUser(form,id): Observable<any> {
    return this.http.put(`${environment.api}/user-list/` + id, form.value);
  }

  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/user-list`,form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.api}/user-list/` + id);
  }
}
