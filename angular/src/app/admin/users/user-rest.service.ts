import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/user-list');
  }

  editUser(id): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/user-list/' + id);
  }

  updateUser(form,id): Observable<any> {
    return this.http.put('https://employees.webmobilez.com/public/api/user-list/' + id, form.value);
  }

  storeUser(form): Observable<any> {
    return this.http.post('https://employees.webmobilez.com/public/api/user-list',form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete('https://employees.webmobilez.com/public/api/user-list/' + id);
  }
}
