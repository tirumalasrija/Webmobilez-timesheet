import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimesheetRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }


  getTimeSheet(): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/time-sheet');
  }
  getTimeSheets(id): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/time-sheet/'+id);
  }

  editTimeSheet(id): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/time-sheet/' + id+'/edit');
  }

  updateTimeSheet(form,id): Observable<any> {
    return this.http.put('https://employees.webmobilez.com/public/api/time-sheet/' + id, form.value);
  }
  storeUser(form): Observable<any> {

    return this.http.post('https://employees.webmobilez.com/public/api/time-sheet', form);
  }
  storeDocument(document): Observable<any> {

    return this.http.post('https://employees.webmobilez.com/public/api/time-sheet-documents', document);
  }
  getTimeDocuments(id): Observable<any> {
    return this.http.get('https://employees.webmobilez.com/public/api/time-sheet-documents/'+id);
  }

  deleteDocument(id): Observable<any> {
    return this.http.delete('https://employees.webmobilez.com/public/api/time-sheet-documents/' + id);
  }
}
