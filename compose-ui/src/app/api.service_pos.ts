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

  public getUserDetails() {
    const sessionID = localStorage.getItem('sessionID');
    console.log(sessionID);
    const headers = new HttpHeaders()
      .set(
        'Content-Type',
        'application/x-www-form-urlencoded;',
      ).set('Access-Control-Allow-Credentials', 'true')
      .set('Access-Control-Allow-Origin', '*');

    var response = this.http.get('http://localhost:8000/mapp-cloud-customers', { headers: headers, withCredentials: true })
    return response;
  }
}