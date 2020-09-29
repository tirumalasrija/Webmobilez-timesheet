import { Injectable } from '@angular/core';
import { ObservedValueOf, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// /api/users/1
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {
  constructor(private http:HttpClient ) { }

    loadUser():Observable <object> {
      return this.http.get('https://employees.webmobilez.com/public/api/user-list/create').pipe(
      );
    }

}
