import { Component, HostBinding, TemplateRef, ViewChild, ViewContainerRef, } from '@angular/core';
import { AuthService } from './auth.service';
import { TimeoutService } from './timeout/timeout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private timeoutService: TimeoutService) {}

  ngOnInit() {
    //this.isAuthenticated = this.authService.checkAuthentication();
    this.authService.checkAuthentication().subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
      if(authenticated){
        this.timeoutService.addTimeout();
        this.timeoutService.startTimer();
      }
    });
  }

  @HostBinding('class') readonly hostClassName = 'mui-app-container';
  title = 'Login Management';
  topNavUrl = 'assets/demo-nav.json';
}