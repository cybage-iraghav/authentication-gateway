import { Injectable } from '@angular/core';
import { TimeoutComponent } from './timeout.component';
import {MatDialog} from '@angular/material/dialog';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  dateTime: Date;
  dateTimeFormatted: string;

  constructor(public dialog: MatDialog, private apiService: APIService) { }

  ngOnInit(): void {
  }

  addTimeout() {
    this.dateTime = new Date();
    this.dateTime.setMinutes(this.dateTime.getMinutes() + 10);
    this.dateTimeFormatted = this.dateTime.toString();
    window.localStorage.setItem("timeout", this.dateTimeFormatted);
  }

  checkPopup(): void {
    const expiryTime =  window.localStorage.getItem("timeout") ?? "";
    console.log('expiry time:', expiryTime);
    const expiryTimestamp = Date.parse(expiryTime);
    const currentTime = new Date().getTime();
    const timeDifference = expiryTimestamp - currentTime;
    if (timeDifference <= 300000 && timeDifference > 0) { // 300000 milliseconds = 5 minutes
      // Open popup here
      if(!this.dialog.openDialogs.length){
        this.dialog.open(TimeoutComponent);
      }
    }
  }

  resetSession() {
    this.addTimeout();
    this.dialog.closeAll();
    // call login status api
    this.apiService.keepAlive().subscribe();
  }

  close() {
    this.dialog.closeAll();
  }

  startTimer(): void {
    setInterval(() => {
      this.checkPopup();
    }, 60000); // Check every minute
  }
 
} 
