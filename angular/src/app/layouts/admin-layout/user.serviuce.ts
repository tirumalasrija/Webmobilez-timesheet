import { Injectable } from '@angular/core';
import { ObservedValueOf, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// /api/users/1
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../environments/environment";
@Injectable()
export class UserService {
  constructor(private http:HttpClient ) { }

    loadUser():Observable <any> {
      return this.http.get(`${environment.api}/user-list/create`);
    }

    getloadTimeSheetsforuserw():Observable <any> {
      return this.http.get(`${environment.api}/getLoadTimeSheetuserw`);
    }
    getUsers():Observable <any> {
      return this.http.get(`${environment.api}/data-list`);
    }
    getFaqs():Observable <any> {
      return this.http.get(`${environment.api}/faqs`);
    }
    storeFaq(form):Observable <any> {
        return this.http.post(`${environment.api}/faqs`,form.value);

    }
    getpaymentbyId(id): Observable<any> {
      return this.http.get(`${environment.api}/payment-list/` + id);
    }
    getpaymentSearch(id): Observable<any> {
      return this.http.get(`${environment.api}/getpayment-by-userid?` + id);
    }
    getpayments(): Observable<any> {
      return this.http.get(`${environment.api}/payment-list`);
    }

}
