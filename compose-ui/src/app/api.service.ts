import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(public location: Location, private http: HttpClient) {

  }

  
  public checkHttpOnlyCookieExists(cookieName: string): boolean {
    const cookies = document.cookie.split(';');
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if the cookie starts with the specified name
      if (cookie.startsWith(`${cookieName}=`)) {
        return true;
      }
    }
    return false;
  }

  public getUserDetails() {
    const headers = new HttpHeaders()
      .set(
        'Content-Type',
        'application/x-www-form-urlencoded;',
      ).set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Origin', '*');

    var response = this.http.get('http://localhost:8000/intelligence/mapp-cloud-customers', { headers: headers, withCredentials: true })
    return response;
  }
  
  public keepAlive() {
    const headers = new HttpHeaders()
      .set(
        'Content-Type',
        'application/x-www-form-urlencoded;',
      ).set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Origin', '*');

    var response = this.http.get('http://localhost:8000/keep_alive', { headers: headers, withCredentials: true })
    return response;
  }
}
