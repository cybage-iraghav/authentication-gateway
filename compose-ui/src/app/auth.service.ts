import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { APIService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //constructor(private apiService: APIService) { }
  constructor(private apiService: APIService, public location: Location, private http: HttpClient) { }


  checkAuthentication(): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Origin', '*');
  
    return this.http.get('http://localhost:8000/login_status', { headers: headers, withCredentials: true, observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((error) => {
          console.error('Error occurred while checking authentication:', error);
          return of(false); // Return false in case of error
        })
      );
  }

  public logout() {
    const headers = new HttpHeaders()
      .set(
        'Content-Type',
        'application/x-www-form-urlencoded;',
      ).set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Origin', '*');

    var response = this.http.get('http://localhost:8000/logout', { headers: headers, withCredentials: true })
    return response;
  }

  /*checkAuthentication(): boolean {
    return this.apiService.checkHttpOnlyCookieExists('XSRF-TOKEN');
  }*/

  /*checkAuthentication(): Observable<boolean> {
    return of(this.checkIfCookieExists()); // Return an observable with the result
  }*/
}