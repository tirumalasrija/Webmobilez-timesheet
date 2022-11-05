import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonAuthService {

  constructor(private http: HttpClient) { }

  loggedIn = false;

  registerUser(form: any){
   
    return this.http.post(`${environment.api}/register`, form.value);
  }

   isAuthonticated(){
  	const promise = new Promise(
  		(resolve,reject) => {
  			setTimeout(() => {
          let t = localStorage.getItem('token');
          if(t){
            this.loggedIn = true;
            resolve(this.loggedIn);
          }else{
            this.loggedIn = false;
            reject();
          }
        },800);
  		});

  	return promise;
  }

  logIn(form: any): Observable<any>{
    return this.http.post(`${environment.api}/login`, form.value);
    //return result;
  }

  logout(token: any): Observable<any>{
    return this.http.post(`${environment.api}/logout`, {'token': token});
    //return result;
  }
}
