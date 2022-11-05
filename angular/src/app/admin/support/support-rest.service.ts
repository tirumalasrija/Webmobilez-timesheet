import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SupportRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getSupport(): Observable<any> {
    return this.http.get(`${environment.api}/faqs`);
  }


  editSupport(id): Observable<any> {
    return this.http.get(`${environment.api}/faqs/` + id);
  }

  updateSupport(form,id): Observable<any> {
    return this.http.put(`${environment.api}/faqs/` + id, form.value);
  }

  storeSupport(form): Observable<any> {
    return this.http.post(`${environment.api}/faqs`,form.value);
  }

  deleteSupport(id): Observable<any> {
    return this.http.delete(`${environment.api}/faqs/` + id);
  }
}
