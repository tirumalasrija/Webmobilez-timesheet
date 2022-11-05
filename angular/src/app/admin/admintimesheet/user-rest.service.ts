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

  getTimeSheet(): Observable<any> {
    return this.http.get(`${environment.api}/getAllTimesheets`);
  }
  getUsers():Observable <any> {
    return this.http.get(`${environment.api}/getUsersbytimesheet`);
  }
  getpaymentSearchTimesheet(id): Observable<any> {
    return this.http.get(`${environment.api}/gettimesheets-by-userid?` + id);
  }

}
